export const typeHelpers={
  methods : {
      isObject(val) {
          return val instanceof Object;
      },
      isNullOrUndefined(val){
          return val === null || typeof val ==='undefined';
      },
      coalesce(val,defaultvalue){
          return this.isNullOrUndefined(val)?defaultvalue:val;
      },
      hasProp(obj,key){
          return this.isObject(obj)&&obj.hasOwnProperty(key);
      },
      objProp(obj,key,defaultvalue){
          return this.hasProp(obj,key) ? this.coalesce(obj[key],defaultvalue) : defaultvalue;
      },
      arrayRemoveItem(array,item){
          let index = array.indexOf(item);
          if (index > -1) {
              array.splice(index, 1);
          }
      }
  }
};