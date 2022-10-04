# Classroom editor website

We welcome to you use our application. First of all, I will represent all members of our team, including more than thirty teachers. The table of content is in the following of this description.

## usage

First, you turn on the home page and you will see the wonderful UI design and the incredible graphics with the magnificent view. Second, if you want to have your class, you should sign up for the account first.

## sign up

First, go to that page(go to the login page first and then click "sign up now" to enter the page), and complete your account and password, after you finish this step and press the submit button, it is going to send the verification mail to you. remember all the verification codes and enter copy to the page. If there are no alerts, it represents you signed up successfully. After all the steps of the signup process, you need to log in to your account on the website to customize your class name and class password.

## login

It is the simplest part of the website, you just only click the login button on the navigation bar.

## profile

It is a part where you can customize your account, you can name your alias, change your password, put your photo, and so on. Look at the page and you can see there are your photo and alias on the left top of the page(if you are a new user, you have no photo and alias). If the website redirects to another page, this represented that you haven't logged in correctly, so, please log in again. From now on, if you have all the correct processes, first, I wanna congratulate you, and then you must follow my step tightly.

### setting profile

You can see the list below your photo and alias, the list is about the configuration option. Below the list, you can see the selector and the text input box, and you can see all the options in the selector. After considering what you want to configure, just select the option and write something you wanna write, after completing all the words, press enter in the text input box, and it will send the data to the database, after completing the processes, the website will reload, and eventually, you can see your brand new profile.

### register class

If you are a teacher, and you wanna make something where everyone can see all the things you want to remind them, or you just wanna register it for fun, if you are in these two situations, this is the right way you wanna come. This is the most attractive feature of the website, you just need to click on your mobile phone or computer. This feature made everything easy to use.

First, you need to visit the profile page and set the "class" and "class password" properties(option), if you still don't know what I am saying go to the setting profile part of this documentation. Now, your class hasn't been available yet because you haven't enabled the class. After setting your "class" and "class password" correctly(you can see them on the left bottom of the website), click the enable button to enable your class. Now, your class is in the publish storage. If you want to change the password of the class, you can also set the property(option), "class password" on the profile page. When you change the "class" property(option), you need to notice something important. You can't change the "class" property(option) if you wanna continue the data you saved, but you still can change it back to continue the data and don't forget to enable it(it has to enable every single time you change).

## editor

On this page, you can create some incredible notifications about who you want to notice. Type anything correctly, and enter the "class" and "class password" you registered just now. Congratulations, this step is the last step teachers need to do.

## look

If it redirects to the class setting page, you just need to enter your "class" and navigate to the look page again, and it will present correctly.

## installation

1. create file

    ```text
    .env
    db.json
    ```

1. config file
    - .env

        ```text
        TIME_ZONE=Region/city
        ```

    - db.json

        ```text
        {
            "type":[],
            "data": []
        }
        ```

1. run `npm start`
