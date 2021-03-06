# RocketVueAppFramework
A series of Vue Components and Plugins that help speed up general app development. Currently implemented using Vuetify.

# Installation
npm i rocketvueappframework --save-dev

In your app.js file (if you are using Laravel and mix):
```javascript
import {AppFramework} from 'rocketvueappframework/framework';
Vue.use(AppFramework);
```

And somewhere in you main app or main app layout blade file (if you are using laravel):
```html
<rocket-app-framework></rocket-app-framework>
```

# Usage

## Dialogs
```javascript
 this.$dialog('Alert title','This is the <strong>message :)</strong>');
```

or a more advanced usage:

```javascript
this.$dialog(title,message,width,showOverlay,buttonObject);
```

The width property is the size of the dialog in perc or pixels. ShowOverlay could be true or false.

```javascript
 this.$dialog('Confirm title','Are you sure?','40%',true,{
                yes : 'Yes',
                no : {label:'No',color:'accent'}
            },).then((result)=>{
                this.$dialog('Your answer',result+'');
            });

```

this.$dialog returns a promise with the key of the button that was pressed. The result will be null if the message was dismissed without a button being pressed.

If a string is passed for the button, it will be displayed in primary color. Otherwise an object could be provided with label andcolor. Th color could either be primary, secondary, info, accent, warning or error 
(see Vuetify text color classes without the --text).

## Form Dialogs
Form dialogs display a rocket form renderer in a dialog. It receives the following input:
* Dialog title
* Dialog instructions
* Rocket form renderer definition. Please refer to RocketFormRenderer in the RocketForm wiki,
* Data object resembling the definition
* Size in perc or pixels
* Whether to hide the overlay (true to show the overlay)
* Button object (optional) - **Very Important** The buttons that should trigger form validation should contain a key `validate:true`. By default the dialog will have save and cancel buttons.


```javascript
          const builder=this.$rf.builder;
          
          let def=[
                 builder.text('name','Name').withIcon('person'),
                 builder.text('email','Email').withIcon('mail').withValidation('required|email'),
                 builder.text('mobile','Mobile'),
            ];

            let data={
                name : 'Ian Rothmann',
                email : 'ian@example.com',
                mobile : '082 123 1234'
            };
            
            this.$formDialog('Register','Please enter your <strong>registration</strong> details',def,data, {
                save : {label:'Save',color:'primary', validate:true},
                cancel : {label:'Cancel',color:'accent'}
            }).then((response)=>{
                if(response.valid){
                    this.$dialog('Hallo '+response.data.name,'We will email you at: '+response.data.email);
                    console.log(response.data);
                }else{
                    this.$dialog('Sorry','We are sorry that you clicked '+response.btn);
                }
   });
```

Response is an object with `valid` (boolean), `btn` the key of the btn clicked and `data`, the returned valid form data. Data is not returned if the button does not `validate:true`.

## Navigation
This calls shows the top activity bar and calls `document.location`.

```javascript
this.$navigate('url here');
```


## Loaders
This displays an overlay with a Vuetify indeterminate circle progress at center screen.
```javascript
this.$showloader('This is some status'); //status is optional
this.$loaderstatus('Almost there');
this.$hideloader();
```
## Snackbar
```javascript
 this.$snackbar(message,messagetype,vertical,horizontal,duration);
```
The messagetype could either be info, warning or error. This controls the color of the OK button. The default message type is info.
The vertical (top, bottom), horizontal (left, right) and duration (milliseconds) parameters are optional, defualing to 4000 in upper right.

## Showing activity
Sometimes you want to show that there is activity without blocking the UI (like the loader).

```javascript
this.$addactivity(id);
this.$removeactivity(id);
```
This will display an indeterminate progress bar at the top of the screen. You should add the activity with an id and remove it again when done. The framework will automatically hide the activity bar when no more activity is present.

Add and remove activity shows a indeterminate bar at the top. To update this bar with specific values, do not call `$addactivity`, instead call:

```javascript
this.$activityProgress(progressValue);
```
where `progressValue` is a number from `0` to `100`. You can keep calling it to update progress. 

To hide the bar send a null value:

```javascript
this.$activityProgress(null);
```

# Automatically displaying ajax request activity with Vue-Resource
In you main app.js file:
```javascript
require('rocketvueappframework/dist/plugins/vue-resource-request-activity');
```
This will configure an interceptor to automatically log activity when an ajax call is active.

# Integrating a Laravel session flash through VueBridge

When using VueBridge, you could install vuebridge-sessionsnackbar in app.js:
```javascript
import {sessionStatusMixin} from 'rocketvueappframework/dist/mixins/vuebridge-sessionsnackbar';
```
and in your root app component:
```javascript
 mixins : [sessionStatusMixin],
```

In Laravel you could then use:

```php
session()->flash('error','Unsuccessful');
session()->flash('warning','Unsuccessful');
session()->flash('status,'Successful');
```

A snackbar will then be displayed upon page load.

# Wrapped components
Some of the vuetify components are wrapped in Rocket Wrapper components to provide a quicker API for using them. If you are using the framework plugin they are automatically imported, but they could also be imported separately. They are all prefixed with rw- (for Rocket Wrapped).

Please see the project wiki for a descripton of all wrapped components.

## Vuetify dialogs
```javascript
  <rw-dialog title="Dialog title here" v-model="showDialog">
            Content here
            <div slot="actions">
                <v-btn class="primary--text" flat>OK<v-btn>
            </div>
  </rw-dialog>
```




