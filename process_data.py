import numpy as np
import cPickle as pickle
import pandas as pd
import MySQLdb
import datetime
from itertools import izip
import matplotlib.pyplot as plt
import time
from datetime import date

db = MySQLdb.connect(host='localhost',
                     port=3306,
                     user='root',
                     passwd='service',
                     db='devAEHRA')
db_cursor = db.cursor(MySQLdb.cursors.DictCursor)



"""	
	Function: 
		Makes an sql query to the devAEHRA database
	Output: 
		Returns a tuple of dictionaries
"""
def sql_call(sql):
	db_cursor.execute(sql)
	return db_cursor.fetchall()



"""	
	Function: 
		Pickle given data object
	Input:
		to_pickle: any object
		filename: filename to save pickled object (without the extension, ex. .csv)
"""
def pickle_dump(to_pickle, filename):
	path = "./processed_pickle/"
	pickle.dump(to_pickle, open(path + filename + ".pickle", "wb+"))



"""	
	Function: 
		Load pickled data object
	Input:
		filename: filename for the pickled data object to load from
	Output:
		De-pickled data object
"""
def pickle_load(filename):
	path = "./processed_pickle/"
	return pickle.load(open(path + filename + ".pickle", "rb"))



"""	
	Function: 
		Datetime object to milliseconds since Epoch
	Input:
		Datetime object
	Output: 
		Milliseconds since Epoch
"""
def milli_since_epoch(dt):
	epoch = datetime.datetime.utcfromtimestamp(0)
	return (dt - epoch).total_seconds() * 1000.0



"""	
	Function: 
		Converts gender string to integer
	Input:
		String "Male" or "Female"
	Output: 
		0 if "Male", 0 otherwise.
"""
def string_sex_to_int(sex):
	if sex == "Male":
		return 0
	else:
		return 1



"""	
	Function: 
		Print full list
	Input:
		Any kind of iterable
"""
def print_full(x):
    pd.set_option('display.max_rows', len(x))
    print(x)
    pd.reset_option('display.max_rows')



"""	
	Function: 
		Round number to the nearest multiple of 5
	Input:
		Any number
"""
def round_to_base(x, base=5):
    return int(base * round(float(x)/base))


def calculate_age(born):
	today = date.today()
	return today.year - born.year - ((today.month, today.day) < (born.month, born.day))



"""	
	Function: 
		Save to processed_pickle folder patient information (patientser, dob, sex)
"""
def pickle_patient_data():
	results = sql_call("""
		SELECT 
			PatientSerNum, DateOfBirth
		FROM 
			Patient
		WHERE 
			DateOfBirth IS NOT NULL
		ORDER BY 
			LastUpdated DESC
		""")
	tmp = [[item['PatientSerNum'], item['DateOfBirth']] for item in results]
	df = pd.DataFrame(tmp, columns=['patientser', 'dob'])
	df = df.set_index('patientser')
	df = df[df['dob'].notnull()]
	df['age'] = df['dob'].apply(calculate_age)
	df['dob'] = df['dob'].apply(milli_since_epoch)
	df['dob'] = df['dob']/60000
	df['sex'] = df['sex'].apply(string_sex_to_int)

	print "DataFrame length:"
	print len(df)
	pickle_dump(df, "patientser_dob_age_sex")



"""	
	Function: 
		Save to processed_pickle folder appointment information for each patient (appser, patientser, arrived, scheduled, actual, wait, late).
		All times are in minutes
"""
def pickle_patient_appointment_data():
	results = sql_call("""
		SELECT
			pl.AppointmentSerNum, ap.PatientSerNum, pl.ArrivalDateTime, ap.ScheduledStartTime, ap.ActualStartDate 
		FROM
			PatientLocationMH pl
		INNER JOIN
			Appointment ap
		ON 
			pl.AppointmentSerNum = ap.AppointmentSerNum
		WHERE
			ap.ActualStartDate != "1970-01-01 00:00:00" AND 
			ap.ScheduledStartTime != "1970-01-01 00:00:00" AND 
			pl.ArrivalDateTime != "1970-01-01 00:00:00" AND 
			pl.RevCount = 0 AND
			   (pl.ResourceSer = 127 OR 
				pl.ResourceSer = 128  OR 
				pl.ResourceSer = 8442  OR 
				pl.ResourceSer = 8225  OR 
				pl.ResourceSer = 8441  OR 
				pl.ResourceSer = 8226)
		""")
	tmp = [[item['AppointmentSerNum'], item['PatientSerNum'], item['ArrivalDateTime'], item['ScheduledStartTime'], item['ActualStartDate']] for item in results]
	df = pd.DataFrame(tmp, columns=['appser', 'patientser', 'arrived', 'scheduled', 'actual'])
	df = df.set_index('appser')
	df['arrived'] = df['arrived'].apply(milli_since_epoch)
	df['arrived'] = df['arrived']/60000
	df['scheduled'] = df['scheduled'].apply(milli_since_epoch)
	df['scheduled'] = df['scheduled']/60000
	df['actual'] = df['actual'].apply(milli_since_epoch)
	df['actual'] = df['actual']/60000
	df = df[abs(df['arrived'] - df['scheduled']) < 300]
	df['wait'] = df['actual'] - df['arrived']
	df['wait'][df['actual'] < df['arrived']] = 0
	df['late'] = np.where((df['arrived'] > df['scheduled']), True, False)

	print "DataFrame length:"
	print len(df)
	pickle_dump(df, "appser_patientser_arrived_scheduled_actual_wait_late")



"""	
	Function: 
		
	Input: 
		
	Output: 
		
"""
def process_data_for_arrivaltime_prediction():
	pd.set_option('display.float_format', lambda x: '%.3f' % x)
	start_time = time.time()
	patient_df = pickle_load("patientser_dob_age_sex")
	app_df = pickle_load("appser_patientser_arrived_scheduled_actual_wait_late")
	df = pd.DataFrame([], columns=['dob', 'avg_arrival', 'latest_arrival_delta', 'avg_arrival_std', 'num_app'])

	for patientser, row in patient_df.iterrows():
		tmp_df = app_df.loc[app_df['patientser'] == patientser]
		if tmp_df.empty:
			continue
		arrival_time_without_latest = tmp_df.loc[tmp_df.index != tmp_df['scheduled'].idxmax()]
		arrival_time_without_latest = arrival_time_without_latest['scheduled'] - arrival_time_without_latest['arrived']

		latest_scheduled = tmp_df['scheduled'][tmp_df['scheduled'].idxmax()]
		if isinstance(latest_scheduled, pd.Series):
			latest_scheduled = latest_scheduled.iloc[0]

		latest_arrived = tmp_df['arrived'][tmp_df['scheduled'].idxmax()]
		if isinstance(latest_arrived, pd.Series):
			latest_arrived = latest_arrived.iloc[0]

		latest_arrival_delta = latest_scheduled - latest_arrived

		avg_arrival = arrival_time_without_latest.mean()

		avg_arrival_std = arrival_time_without_latest.std()

		num_app = arrival_time_without_latest.shape[0]
		
		df = df.append(pd.DataFrame([[row['dob'], avg_arrival, latest_arrival_delta, avg_arrival_std, num_app]], columns=['dob', 'avg_arrival', 'latest_arrival_delta', 'avg_arrival_std', 'num_app']))

	df = df[df['num_app'] > 1]
	df = df.sample(frac=1)

	print df
	pickle_dump(df['latest_arrival_delta'].head((int) (len(df)*0.75)), "train_y")
	pickle_dump(df['latest_arrival_delta'].tail((int) (len(df)*0.25)), "test_y")

	del df['latest_arrival_delta']
	pickle_dump(df.head((int) (len(df)*0.75)), "train_x")
	pickle_dump(df.tail((int) (len(df)*0.25)), "test_x")

	print time.time() - start_time



#def process_data_for_appointment_duration_prediction():




"""	
	Function: 
		Plot a histogram and save to an image file
	Input:
		df_x: List of x values
		df_y: List of y values
		title: Title of the histogram
		xlabel: Label for x-axis
		ylabel: Label for y-axis
		img_name: Name of the image file
		(Optional) df_labels: List of labels for each histogram bar
"""
def plot(x, y, title, xlabel, ylabel, img_name, labels = [], note = ""):
	plt.figure(figsize=(18, 8))
	ax = y.plot(kind='bar')
	ax.set_title(title)
	ax.set_xlabel(xlabel)
	ax.set_ylabel(ylabel)
	ax.set_xticklabels(x, rotation=45)
	
	axes = plt.gca()
	axes.set_ylim([0, 2500])

	rects = ax.patches

	for y_value, rect, label in zip(y, rects, labels):
		if y_value < 0:
			height = 0.5
		else:
			height = rect.get_height() + 0.5
		ax.text(rect.get_x() + rect.get_width()/2, height, label, ha='center', va='bottom')

	plt.annotate(note, (0,0), (0, -60), xycoords='axes fraction', textcoords='offset points', va='top')
	plt.savefig(img_name + '.png')



""" Histogram 1: x = percentage of times late, y = number of patients """
def hist1_percentlate_vs_numpatients(df):
	hist1_df = df['num_late_percent'].value_counts()
	hist1_df = hist1_df.to_frame()
	hist1_df = hist1_df.sort_index()
	hist1_df.columns = ['num_patients']
	print hist1_df
	tmp = pd.DataFrame([], columns=['avg_num_app'])
	for num_late_percent, row in hist1_df.iterrows():	# Calculate average number of appointments for each percentile
		tmp = tmp.append(pd.DataFrame(zip(*[[num_late_percent], [df['num_app'][df['num_late_percent'] == num_late_percent].sum()/row['num_patients']]]), columns=['num_late_percent', 'avg_num_app']))
	tmp = tmp.set_index('num_late_percent')
	hist1_df['avg_num_app'] = tmp
	hist1_df = hist1_df[hist1_df['num_patients'] > 2]
	plot(
		x = hist1_df.index, 
		y = hist1_df['num_patients'], 
		title = "Number of Patients Late for a Percentile of Appointments", 
		xlabel = "Percentage of Times Late (By >0 Minutes)", 
		ylabel = "Number of Patients", 
		img_name = "hist1_percentlate_vs_numpatients_0min",
		labels = hist1_df['avg_num_app'],
		note = "Only patients with at least 3 past appointments are considered. Number labels on top of each percentile are the average numbers of appointments for each percentile.")



""" Histogram 2: x = age, y = arrival - scheduled discrepancy """
def hist2_age_vs_arrival_scheduled_delta(df):
	df['age'] = df['age'].apply(round_to_base)
	hist2_df = df['age'].value_counts()
	hist2_df = hist2_df.to_frame()
	hist2_df = hist2_df.sort_index()
	hist2_df.columns = ['num_patients']

	for age in hist2_df.index:
		hist2_df.loc[age, 'arrived_scheduled_delta'] = df['arrived_scheduled_delta'][df['age'] == age].sum() / hist2_df['num_patients'][age]

	plot(
		x = hist2_df.index, 
		y = hist2_df['arrived_scheduled_delta'], 
		title = "Average Discrepancy Between Arrival Time and Scheduled Appointment Time for Age Groups", 
		xlabel = "Age Groups", 
		ylabel = "Average of Scheduled - Arrived (in minutes)", 
		img_name = "hist2", 
		labels = hist2_df['num_patients'])



""" Histogram 3: x = gender, y = arrival - scheduled discrepancy """
def hist3_gender_vs_arrival_scheduled_delta(df):
	hist3_df = df['sex'].value_counts()
	hist3_df = hist3_df.to_frame()
	hist3_df = hist3_df.sort_index()
	hist3_df.columns = ['num_patients']

	hist3_df.loc[0, 'arrived_scheduled_delta'] = df['arrived_scheduled_delta'][df['sex'] == 0].sum() / hist3_df['num_patients'][0]
	hist3_df.loc[1, 'arrived_scheduled_delta'] = df['arrived_scheduled_delta'][df['sex'] == 1].sum() / hist3_df['num_patients'][1]

	plot(
		x = hist3_df.index, 
		y = hist3_df['arrived_scheduled_delta'], 
		title = "Average Discrepancy Between Arrival Time and Scheduled Appointment Time for Female vs Male Patients", 
		xlabel = "Gender, 0 = Male, 1 = Female", 
		ylabel = "Average of Scheduled - Arrived (in minutes)", 
		img_name = "hist3", 
		labels = hist3_df['num_patients'])



""" Histogram 4: x = percentage of times late, y = avg waiting time of those patients """
def hist4_percentlate_vs_avgwait(df):
	unique_num_late = df['num_late_percent'].unique()
	zero_array = [0]*len(unique_num_late)
	hist4_df = pd.DataFrame(zip(*[unique_num_late, zero_array, zero_array]), columns=['num_late_percent', 'avg_wait_time', 'num_patients'])
	hist4_df = hist4_df.set_index('num_late_percent')

	for index, row in df.iterrows():
		num_late_percent = int(row['num_late_percent'])
		hist4_df['avg_wait_time'][num_late_percent] += row['avg_wait_time']
		hist4_df['num_patients'][num_late_percent] += 1

	hist4_df = hist4_df[hist4_df['num_patients'] > 2]
	hist4_df['avg_wait_time'] = hist4_df['avg_wait_time'] / hist4_df['num_patients']
	hist4_df = hist4_df.sort_index()

	plot(
		x = hist4_df.index, 
		y = hist4_df['avg_wait_time'], 
		title = "Average Waiting Time for Patients Late for X Number of Appointment", 
		xlabel = "Percentage of Times Late", 
		ylabel = "Average Waiting Time (in minutes)", 
		img_name = "hist4", 
		labels = hist4_df['num_patients'],
		note = "Average waiting time for >2 patients are considered. Number labels on top of each blocks is the numbe of patients considered.")



"""	
	Function: 
		Creates two histograms image files, 1: number of patients late for X amount of appointments, 2: average waiting time for patients late for X number of appointments
"""
def histograms():
	start_time = time.time()
	app_df = pickle_load("appser_patientser_arrived_scheduled_actual_wait_late")
	patient_df = pickle_load("patientser_dob_age_sex")

	# Counting how many appointments each patient has
	patient_app_count = app_df['patientser'].value_counts()	
	patient_app_count = patient_app_count.to_frame()
	patient_app_count.columns = ['num_app']

	# Histograms will only take account of patients whose had at least 3 appointments
	patient_app_count = patient_app_count[patient_app_count['num_app'] > 2]	
	zero_array = [0.0]*patient_app_count.shape[0]

	tmp_df = pd.DataFrame(zip(*[patient_app_count.index, zero_array, zero_array, zero_array, patient_app_count['num_app']]), columns=['patientser', 'num_late_percent', 'avg_wait_time', 'arrived_scheduled_delta', 'num_app'])
	tmp_df = tmp_df.set_index('patientser')
	for appser, row in app_df.iterrows():
		patientser = row['patientser']
		if patientser in tmp_df.index:
			if row['late']:

				#number of times a patient is late, will be divided by the total number of appointments later
				tmp_df.loc[patientser, 'num_late_percent'] += 1.0

			#cumulative time of patient's lateness, to be divided by the total number of late appointments later
			tmp_df.loc[patientser, 'arrived_scheduled_delta'] += row['scheduled'] - row['arrived']
			
			tmp_df.loc[patientser, 'avg_wait_time'] += row['wait']
	
	tmp_df['avg_wait_time'] = tmp_df['avg_wait_time'] / tmp_df['num_app']
	
	tmp_df['arrived_scheduled_delta'] = tmp_df['arrived_scheduled_delta'] / tmp_df['num_app']
	tmp_df['arrived_scheduled_delta'] = tmp_df['arrived_scheduled_delta'].fillna(0)
	
	tmp_df['num_late_percent'] = tmp_df['num_late_percent'] / tmp_df['num_app'] * 100
	tmp_df['num_late_percent'] = tmp_df['num_late_percent'].apply(round_to_base)
	
	tmp_df['arrived_scheduled_delta'] = tmp_df['arrived_scheduled_delta'].apply(round_to_base)
	
	tmp_df = tmp_df.join(patient_df, how='inner')
	
	print tmp_df

	hist1_percentlate_vs_numpatients(tmp_df)

	#hist2_age_vs_arrival_scheduled_delta(tmp_df)

	#hist3_gender_vs_arrival_scheduled_delta(tmp_df)

	#hist4_percentlate_vs_avgwait(tmp_df)
	
	print time.time() - start_time