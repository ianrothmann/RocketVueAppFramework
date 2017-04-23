# RocketVueAppFramework
A series of Vue Components and Plugins that help speed up general app development. Currently implemented using Vuetify.

# Installation
npm i rocketvueappframework --save-dev

In your app.js file (if you are using Laravel and mix):
```
import {AppFramework} from 'rocketvueappframework/framework';
Vue.use(AppFramework);
```

And somewhere in you main app or main app layout blade file (if you are using laravel):
```
<rocket-app-framework></rocket-app-framework>
```

# Usage

## Dialogs
```
 this.$dialog('Alert title','This is the <strong>message :)</strong>');
```

or a more advanced usage:

this.$dialog(title,message,buttonObject);

```
 this.$dialog('Confirm title','Are you sure?',{
                yes : 'Yes',
                no : {label:'No',color:'accent'}
            }).then((result)=>{
                this.$dialog('Your answer',result+'');
            });

```

this.$dialog returns a promise with the key of the button that was pressed. The result will be null if the message was dismissed without a button being pressed.

If a string is passed for the button, it will be displayed in primary color. Otherwise an object could be provided with label andcolor. Th color could either be primary, secondary, info, accent, warning or error 
(see Vuetify text color classes without the --text).


## Loaders
This displays an overlay with a Vuetify indeterminate circle progress at center screen.
```
this.$showloader('This is some status'); //status is optional
this.$loaderstatus('Almost there');
this.$hideloader();
```
## Snackbar
```
 this.$snackbar(message,messagetype,vertical,horizontal,duration);
```
The messagetype could either be info, warning or error. This controls the color of the OK button. The default message type is info.
The vertical (top, bottom), horizontal (left, right) and duration (milliseconds) parameters are optional, defualing to 4000 in upper right.

## Showing activity
Sometimes you want to show that there is activity without blocking the UI (like the loader).

```
this.$addactivity(id);
this.$removeactivity(id);
```
This will display an indeterminate progress bar at the top of the screen. You should add the activity with an id and remove it again when done. The framework will automatically hide the activity bar when no more activity is present.

# Automatically displaying ajax request activity with Vue-Resource
In you main app.js file:
```
require('rocketvueappframework/plugins/vue-resource-request-activity');
```
This will configure an interceptor to automatically log activity when an ajax call is active.

# Integrating a Laravel session flash through VueBridge

When using VueBridge, you could install vuebridge-sessionsnackbar in app.js:
```
import {sessionStatusMixin} from 'rocketvueappframework/mixins/vuebridge-sessionsnackbar';
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

## Vuetify Tabs
Coming soon



