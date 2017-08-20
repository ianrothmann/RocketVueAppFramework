<template>
    <div>
        <v-subheader style="padding-left:0;" v-if="label">{{label}}</v-subheader>
        <div v-if="error" class="input-group input-group--error radio input-group--selection-controls no-margins">
            <div class="input-group__details">
                <div class="input-group__messages"><div class="input-group__error">{{error}}</div></div>
            </div>
        </div>
        <div class="map-control">
        <div ref="mapContainer" :style="{height: height}" :class="{'location_map':editMode,'location_map_full':editMode}"></div>
        <v-toolbar floating dense v-if="editMode" class="white map-search-box">
            <v-text-field prepend-icon="search" hide-details single-line placeholder="Find address" v-model="searchAddress"></v-text-field>

            <v-btn icon @click="find()">
                <v-icon>arrow_forward</v-icon>
            </v-btn>
            <v-menu>
                <v-btn icon slot="activator">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list dense>
                    <v-list-tile @click="findMarker()">
                        <v-list-tile-title>Find marker</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="clear()">
                        <v-list-tile-title>Clear</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

        </v-toolbar>

        <v-card v-if="innerValue!=null" class="map-info">
            <div style="padding:5px">
                <s-grid>
                    <s-cell sm="4">
                        <b>Marker position</b>
                        <div>{{parseFloat(innerValue.lat).toFixed(5)}}, {{parseFloat(innerValue.lng).toFixed(5)}}</div>
                    </s-cell>
                    <s-cell sm="8" v-if="markeraddress!==''">
                        <b>Closest matching address</b>
                        <div id="address">{{markeraddress}}</div>
                    </s-cell>
                </s-grid>
            </div>
        </v-card>
        <v-card v-if="innerValue===null&&editMode" class="map-ins">
                <div style="padding:5px; text-align: center">
                    <b><v-icon>pin_drop</v-icon>Right click to place a marker</b>
                </div>
       </v-card>

        </div>
    </div>
</template>
<style>
    .input-group.no-margins{
        padding-top:0;
    }
    .map-control{
        position: relative;
    }
    .map-search-box{
        width:50%;
        position: absolute;
        top:12px;
        left:calc(25%);
    }
    .map-info{
        width:60%;
        font-size: 12px;
        position: absolute;
        top:calc(80%);
        left:calc(25%);
        opacity : 0.8;
    }
    .map-ins{
        width:30%;
        font-size: 12px;
        position: absolute;
        top:calc(80%);
        left:calc(40%);
        opacity : 0.8;
    }
    .location_map{
        width:calc(70% - 10px);
    }
    .location_map_full{
        width:100%;
    }
</style>
<script>
    export default{
        props : {
            name : {type:String},
            value : {},
            label : {},
            center : {required:true,type:Object},
            zoom : {type:Number, default:16},
            mode : {type:String,default:'edit'},
            height : {type:String,default:'300px'}
        },
        inject: ['$validator'],
        computed:{
           innerCenter(){
               if(this.innerValue===null){
                    return this.center;
               }else{
                   return this.innerValue;
               }
           },
           editMode(){
               return this.mode==='edit';
           },
           error(){
               if(this.name&&this.verrors&&this.verrors.has(this.name)){
                   return this.verrors.first(this.name);
               }
           }

        },
        data(){
           return {
               innerValue : null,
               geocoder : null,
               markeraddress : '',
               searchAddress : '',
               gMap : null,
               gMarker : null
           }
        },
        mounted(){
           this.initMap();
           this.transferValue();
           this.$watch('value',()=>{
               this.transferValue();
           },{deep:true});


        },
        methods : {
           transferValue(){
               if(this.value!==null && typeof this.value === 'object'){
                   this.innerValue={
                       lat : this.value.lat,
                       lng : this.value.lng
                   };
                   if(this.gMarker===null){
                       this.drawMarker();
                   }
                   let latLng=new google.maps.LatLng(this.innerValue.lat,this.innerValue.lng);
                   this.setMarkerPosition(latLng);
               }else{
                   this.innerValue=null;
                   this.drawMarker();
               }
           },
           initMap(){
               this.geocoder = new google.maps.Geocoder();

               const mapOptions = {
                   center: new google.maps.LatLng(this.innerCenter.lat,this.innerCenter.lng),
                   zoom: this.zoom
               };

               this.gMap = new google.maps.Map(this.$refs.mapContainer,mapOptions);
               if(this.editMode){
                   google.maps.event.addListener(this.gMap, 'rightclick', (event)=>{
                       if(this.innerValue===null){
                           this.innerValue={};
                           this.innerValue.lat=event.latLng.lat();
                           this.innerValue.lng=event.latLng.lng();
                           this.drawMarker();
                           this.emitInnerValue();
                       }
                   });
               }
           },
           emitInnerValue(){
               this.$emit('input',this.innerValue);
               this.$emit('change',this.innerValue);
           },
           clear(){
               this.innerValue=null;
               this.emitInnerValue();
           },
           drawMarker(){
               if(this.gMarker!==null)
                   this.gMarker.setMap(null);

               if(this.innerValue!==null){
                   let latLng = new google.maps.LatLng(this.innerValue.lat,this.innerValue.lng);
                   this.gMarker= new google.maps.Marker({
                       position: latLng,
                       map: this.gMap,
                       title: "Position",
                       draggable: this.editMode
                   });
                   this.gMarker.setMap(this.gMap);
                   this.gMap.setCenter(latLng);
                   if(this.editMode){
                       google.maps.event.addListener(this.gMarker, 'drag', ()=>{
                           this.updateInnerValue(this.gMarker.getPosition());
                       });

                       google.maps.event.addListener(this.gMarker, 'dragend', ()=>{
                           this.updateInnerValue(this.gMarker.getPosition());
                           this.setMarkerPosition(this.gMarker.getPosition());
                           this.geocodePosition(this.gMarker.getPosition());
                           this.emitInnerValue();
                       });
                   }
               }else{
                   this.gMarker=null;
               }

           },
           geocodePosition(latLng) {
               this.geocoder = new google.maps.Geocoder();
               this.geocoder.geocode({
                    latLng: latLng
                }, (responses)=>{
                    if (responses && responses.length > 0) {
                        this.markeraddress=responses[0].formatted_address;
                    } else {
                        this.markeraddress='Cannot determine address at this location.';
                    }
                });
           },
           updateInnerValue(latLng) {
               this.innerValue={
                   lat:latLng.lat(),
                   lng:latLng.lng(),
               };
           },
           findMarker(){
               if(this.innerValue!==null){
                   let latLng = new google.maps.LatLng(this.innerValue.lat,this.innerValue.lng);
                   this.gMap.setCenter(latLng);
               }

           },
           setMarkerPosition(latLng){
               this.gMarker.setPosition(latLng);
               setTimeout(()=>{
                   this.geocodePosition(latLng);
               },50);

           },
           find(){
                if(this.searchAddress!==''){
                    this.geocoder.geocode({
                        address: this.searchAddress
                    }, (responses)=>{
                        if (responses && responses.length > 0) {
                            this.updateInnerValue(responses[0].geometry.location);
                            this.setMarkerPosition(responses[0].geometry.location);
                            this.findMarker();
                            this.markeraddress=responses[0].formatted_address;
                        } else {
                            this.markeraddress='Cannot determine address at this location.';
                        }
                    });
                }

            }
        }
    }
</script>
