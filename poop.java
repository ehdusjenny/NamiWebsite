public class poop {
	String myFavouriteWord;

	public poop() {
		myFavouriteWord = "poop";
	}

	public String getPoop() {
		return myFavouriteWord;
	}

	public void setPoop(String poop) {
		if (!poop.equals("poop")) {
			throw new NotPoopException();
		}
		else {
			myFavouriteWord = poop;
		}
	}
}

