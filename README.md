

# Android React Native App
An Android app to keep track of my monthly expenses.  The data is synced with an AWS DynamoDB database.

This project contains source code and supporting files for the following post.
http://iwankruger.com/posts/expense_logger


<img src="app_images/expense_logger_system_overview.png" width="400" height1="200">

The backend repository can be found [here](https://github.com/iwankruger/expense_logger_backend).

AWS Cognito Credentials must be added to the authConfig.js file.

<img src="app_images/expense_overview.png" width="200" height1="200"><img src="app_images/menu.png" width="200" height1="200">
<img src="app_images/expense_add.png" width="200" height1="200">
<img src="app_images/calendar.png" width="200" height1="200">
<img src="app_images/calculator.png" width="200" height1="200">
<img src="app_images/expense_detail.png" width="200" height1="200">
<img src="app_images/income_add.png" width="200" height1="200">
<img src="app_images/income_overview.png" width="200" height1="200">
<img src="app_images/select_month.png" width="200" height1="200">


## Deploy app on Android Studio Emulator
sudo react-native run-android  
sudo react-native start

## To create an apk file
cd android  
sudo ./gradlew assembleRelease  
find apk in android/app/build/outputs/apk/release/app-release.apk
