<h1>Welcome to my app "letmeask"</h1>
<p>This app was developed in a programming course of reactJs of the <a target="_blank" href="https://app.rocketseat.com.br/">Rocketseat</a> online school, in the Next Level Week event for programing of all levels.</p>
<p>This app is a SPA bootstrapped with <a target="_blank" href="https://github.com/facebook/create-react-app">[Create React App]</a> and, basically, creates a place that monitors can communicate with their audience in real time while receive questions that are sort by likes / votes by the people in audience in real time, this way, the monitor can easily know what question to answer and to mark it how answered just next to continue receiving new questions, it is possible to delete an unwanted question or highlight an good question too.</p>
<p>The data is all stored in the firebase realtime database, except by the theme (dark/default or light) chosen by each user, it stay in the local storage.</p>
<p>Originally it was only this, but I decided to insert more functions in it that are next:</p>
<p>Now, the monitors can insert video link of any video providers like youtube, vimeo, dailymotion, twitch and many others, to this, I used the <a target="_blank" href="https://www.npmjs.com/package/react-player">ReactPlayer</a> in a simple but eficient implementation; the users can choose under two options of theme (dark or light), and the layout is responsive now, to be displayed in any format and size screen.</p>

<p>You can see and use the app <a target="_blank" href="https://letmeask-f38c5.web.app/">here</a></p>
<p>But, if you want to run this app by yourself, simply create a firebase app <a target="_blank" href="https://console.firebase.google.com">here</a></p>
<p>In next, you need to write the app credentials in a file ".env.local" in the root directory like it:</p>

<pre><code>
# Firebase
REACT_APP_API_KEY="asdfsadfasdfasdf"
REACT_APP_AUTH_DOMAIN="asdfasdfasdfasdf.firebaseapp.com"
REACT_APP_DATABASE_URL="https://asdfasdfasdfasdf.firebaseio.com"
REACT_APP_PROJECT_ID="asdfasdfasdfasdf"
REACT_APP_STORAGE_BUCKET="asdfasdfasdfasdf.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="1234324234234"
REACT_APP_APP_ID="1:234132412341234:web:qwerqwe986796987qw6er"
</code></pre>

<p>In next, you need to run "yarn start" to run the local test server and to test the app locally.</p>

## Learn More

You can learn more in the <a target="_blank" href="https://facebook.github.io/create-react-app/docs/getting-started">[Create React App documentation]</a>.

To learn React, check out the <a target="_blank" href="https://reactjs.org/">[React documentation]</a>.

<p>I hope it help you like it helped me too! Thanks for see it and give a repo star if you like it!</p>

# letmeask
