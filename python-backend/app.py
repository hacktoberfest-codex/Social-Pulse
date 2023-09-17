from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})


from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
import pickle
import pandas as pd
import os
import nltk
nltk.download('stopwords')
import re
import string
exclude=string.punctuation
import joblib
import praw

@app.route('/analyze', methods=['POST'])
def receive_comments():


    # Get the data from the form
    comments = request.json.get('comments')


    #converting the data into CSV to feed the model
    with open('/home/surajr425/mysite/Top_C.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        for comment in comments:
            writer.writerow([comment])


    #preprocessing the data
    df=pd.read_csv('/home/surajr425/mysite/Top_C.csv')
    print(df)

    def removing_username(df):
     if df.columns[0] == 'Author':
         df = df.iloc[:, 1:]
     df = df.rename(columns={df.columns[0]: 'reviews'})
     return df


    def tolowercase(df):
      #Convert all string to Lower Case
       df['reviews']=df['reviews'].str.lower()
       return df


    def remove_urls(text):
     #Remove URLS
     pattern=re.compile(r'https?://S+|www\.\S+')
     return pattern.sub(r'',text)




    def remove_punctuation(text):
      return text.translate(str.maketrans('','',exclude))

    cv=CountVectorizer()

    def preprocess_text(df):
     df=removing_username(df)
     df=tolowercase(df)
     df['reviews']= df['reviews'].apply(remove_urls)
     df['reviews']=df['reviews'].apply(remove_punctuation)
     sw_list=stopwords.words('english')
     df['reviews'] = df['reviews'].apply(lambda x: [item for item in x.split() if item not in sw_list]).apply(lambda x:" ".join(x))
     return df


    preprocessed_test_df=preprocess_text(df)
    print(preprocessed_test_df)

    cv = joblib.load('/home/surajr425/mysite/vectorizer1.pkl')
    preprocessed_test_df['reviews']=cv.transform(preprocessed_test_df['reviews']).toarray()

    model=pickle.load(open('/home/surajr425/mysite/model_test1.pkl','rb'))

    prediction=model.predict(preprocessed_test_df)

    print(prediction)

    prediction_list = prediction.tolist()
    return jsonify( {'predictions':prediction_list} ), 200



@app.route('/toppost', methods=['POST'])
def toppostdata():
    subreddit=request.json.get('subreddit')
    # Read-only instance
    reddit_read_only = praw.Reddit(client_id="CdrG-No3-jDQ36HdKXq-Xw",client_secret="QSnYHa-84LW7RJZAOWoqtrSGF8ySqQ",user_agent="emotional scraper")
    subreddit = reddit_read_only.subreddit(subreddit)
    posts = subreddit.top(time_filter="month")
    posts_dict = {"Title": [], "Post Text": [],"ID": [], "Score": [], "Total Comments": [], "Post URL": []}
    for post in posts:
    # Title of each post
      posts_dict["Title"].append(post.title)

    # Text inside a post
      posts_dict["Post Text"].append(post.selftext)

    # Unique ID of each post
      posts_dict["ID"].append(post.id)

    # The score of a post
      posts_dict["Score"].append(post.score)

    # Total number of comments inside the post
      posts_dict["Total Comments"].append(post.num_comments)

    # URL of each post
      posts_dict["Post URL"].append(post.url)

    return jsonify({'data':posts_dict}),200




if __name__ == '__main__':
    app.run(debug=True)

