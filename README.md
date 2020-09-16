

# Android React Native App
An Android app to keep track of my monthly expenses.  The data is synced with a AWS DynamoDB database.

The backend repo can be found here todo

AWS Cognito Credentials must be added to this the authConfig.js file.

<img src="app_images/expense_overview.png" width="200" height1="200"> <img src="app_images/menu.png" width="200" height1="200">
<img src="app_images/expense_add.png" width="200" height1="200">
<img src="app_images/calendar.png" width="200" height1="200">
<img src="app_images/calculator.png" width="200" height1="200">
<img src="app_images/income_add.png" width="200" height1="200">
<img src="app_images/income_overview.png" width="200" height1="200">
<img src="app_images/select_month.png" width="200" height1="200">


## Deploy app on Android Studio Emulator
sudo react-native run-android  
sudo react-native start

## To create a apk file
cd android  
sudo ./gradlew assembleRelease  
find apk in android/app/build/outputs/apk/release/app-release.apk
