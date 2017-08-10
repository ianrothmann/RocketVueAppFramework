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


this.$dialog(title,message,buttonObject,hideOverlay);

```javascript
 this.$dialog('Confirm title','Are you sure?',{
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
* Button object (optional) - **Very Important** The buttons that should trigger form validation should contain a key `validate:true`. By default the dialog will have save and cancel buttons.
* Whether to hide the overlay

```javascript
          let def=[
                {type:'text',name:'name',label:'Name',validation:'required'},
                {type:'text',name:'email',label:'Email address',validation:'required|email'},
                {type:'text',name:'mobile',label:'Mobile',validation:'required'},
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

# Automatically displaying ajax request activity with Vue-Resource
In you main app.js file:
```javascript
require('rocketvueappframework/dist/plugins/vue-resource-request-activity');
```
This will configure an interceptor to automatically log activity when an ajax call is active.

# Integrating a Laravel session flash through VueBridge

When using VueBridge, you could install vuebridge-sessionsnackbar in app.js:
```
import {sessionStatusMixin} from 'rocketvueappframework/dist/mixins/vuebridge-sessionsnackbar';
```
and in your root app component:
```
 mixins : [sessionStatusMixin],
```

In Laravel you could then use:

```
session()->flash('error','Unsuccessful');
session()->flash('warning','Unsuccessful');
session()->flash('status,'Successful');
```

A snackbar will then be displayed upon page load.

# Wrapped components
Some of the vuetify components are wrapped in Rocket Wrapper components to provide a quicker API for using them. If you are using the framework plugin they are automatically imported, but they could also be imported separately. They are all prefixed with rw- (for Rocket Wrapped).

Please see the project wiki for a descripton of all wrapped components.

## Vuetify dialogs
```
  <rw-dialog title="Dialog title here" v-model="showDialog">
            Content here
            <div slot="actions">
                <v-btn class="primary--text" flat>OK<v-btn>
            </div>
  </rw-dialog>
```
include rocketvueappframework/components/DialogWrapper.vue (if using separately from the framework).




