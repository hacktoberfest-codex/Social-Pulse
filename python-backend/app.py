from flask import Flask ,request,jsonify

import csv

app=Flask(__name__)


@app.route("/",methods=['POST'])
def receive_comments():

    #Get the data from the post request and convert it to JSON
    comments=request.json.get('comments')


    print(comments)

    #converting the data into CSV to feed the model
    with open('Top_C.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        for comment in comments:
            writer.writerow([comment])
    
    #Returning the data back to the frontend in the form of JSON
    return jsonify( {'comments':comments} ), 200

if __name__ =='__main__':
    app.run(debug=True)