   class FileItem
   {
      
      var file_id_sequence = 0;
      
      var FILE_STATUS_CANCELLED = -5;
      
      var FILE_STATUS_QUEUED = -1;
      
      var FILE_STATUS_NEW = -6;
      
      var FILE_STATUS_SUCCESS = -4;
      
      var FILE_STATUS_IN_PROGRESS = -2;
      
      var FILE_STATUS_ERROR = -3;
       
      
      var file_reference;
      
      var index = -1;
      
      var file_status = 0;
      
      var id;
      
      var js_object;
      
      var postObject;
      
      function FileItem(param1, param2, param3)
      {
         var file_reference = param1;
         var control_id = param2;
         var index = param3;
         super();
         this.postObject = {};
         this.file_reference = file_reference;
         this.id = control_id + "_" + FileItem.file_id_sequence++;
         this.file_status = FileItem.FILE_STATUS_NEW;
         this.index = index;
         this.js_object = {
            "id":this.id,
            "index":this.index,
            "post":this.GetPostObject()
         };
         try
         {
            this.js_object.name = this.file_reference.name;
            this.js_object.size = this.file_reference.size;
            this.js_object.type = this.file_reference.type || "";
            this.js_object.creationdate = this.file_reference.creationDate || new Date(0);
            this.js_object.modificationdate = this.file_reference.modificationDate || new Date(0);
         }
         catch(ex)
         {
            this.file_status = FileItem.FILE_STATUS_ERROR;
         }
         this.js_object.filestatus = this.file_status;
      }
      
      function EscapeCharacter()
      {
         return "$" + ("0000" + arguments[0].charCodeAt(0).toString(16)).substr(-4,4);
      }
      
      function EscapeParamName(param1)
      {
         param1 = param1.replace(/[^a-z0-9_]/gi,FileItem.EscapeCharacter);
         param1 = param1.replace(/^[0-9]/,FileItem.EscapeCharacter);
         return param1;
      }
      
      function ToJavaScriptObject()
      {
         this.js_object.filestatus = this.file_status;
         this.js_object.post = this.GetPostObject(true);
         return this.js_object;
      }
      
      function RemoveParam(param1)
      {
         delete this.postObject[param1];
      }
      
      function AddParam(param1, param2)
      {
         this.postObject[param1] = param2;
      }
      
      function GetPostObject(param1 = false)
      {
         var _loc2_ = null;
         var _loc3_ = null;
         var _loc4_ = null;
         if(param1)
         {
            _loc2_ = {};
            for(_loc3_ in this.postObject)
            {
               if(this.postObject.hasOwnProperty(_loc3_))
               {
                  _loc4_ = FileItem.EscapeParamName(_loc3_);
                  _loc2_[_loc4_] = this.postObject[_loc3_];
               }
            }
            return _loc2_;
         }
         return this.postObject;
      }
      
      function toString()
      {
         return "FileItem - ID: " + this.id;
      }
   }

