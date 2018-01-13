Create Issue:
curl -i -H 'Authorization: token ef90057a0c293281f17461efebbf7348a597f202' \
   -d '{ "title": "Test", "body": "Test", "labels": ["enhancement"] }' \
https://api.github.com/repos/Sable/qplus/issues


See Issue:
curl -i -H 'Authorization: token ef90057a0c293281f17461efebbf7348a597f202' https://api.github.com/repos/Sable/qplus/issues
