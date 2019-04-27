How to solve problem 1

Follow along video: https://youtu.be/CuIvYZ5US0Q

Steps:

1.  Create an index.html file that contains the react and react dom libraries
2.  Let's make sure everything is properly configured. Create a small react element using React.createElement and use ReactDOM.render to populate the DOM. Load it in your browser.
3.  Looking at our data, we see that we need to display three kinds of data: sellers, items and locations.
    a. Create a function for every kind of data. The function takes an object and returns a react element.
    b. Start with the inner most kinds of objects (location) and move to sellers.
4.  Generate a react element or an array of react elements. Store the reference in a variable.
5.  Modify the ReactDOM.render call from step 2
