var swfupload = {
    fileQueueLimit : 0,
    fileBrowserMany : [],
    file_queue : [],
    file_index : [],
    valid_file_extensions : [],
    filePostName : "",
    


    swfupload:function()
    {
        var self = null;
        var oSelf = null;
        fileBrowserMany = new Array();
        file_queue = new Array();
        file_index = new Array();
        valid_file_extensions = new Array();
        httpSuccess = [];
        // figuring out urlrequest
      //  if(!URLRequest || !DataEvent.UPLOAD_COMPLETE_DATA)
     //   {
     //      return;
     //   }
       // Security.allowDomain("*");

     //   this.fileBrowserMany.addEventListener("select",this.Select_Many_Handler);
     //   this.fileBrowserMany.addEventListener(Event.CANCEL,this.DialogCancelled_Handler);
     
    //    this.flashReady_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].flashReady";
    //    this.fileDialogStart_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileDialogStart";
    //    this.fileQueued_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileQueued";
    //    this.fileQueueError_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileQueueError";
    //    this.fileDialogComplete_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileDialogComplete";
    //    this.uploadStart_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadStart";
    //    this.uploadProgress_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadProgress";
    //    this.uploadError_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadError";
    //    this.uploadSuccess_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadSuccess";
    //    this.uploadComplete_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadComplete";
    //    this.debug_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].debug";
    //    this.testExternalInterface_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].testExternalInterface";
    //    this.cleanUp_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].cleanUp";
    //    this.uploadURL = root.loaderInfo.parameters.uploadURL;
    //    this.filePostName = root.loaderInfo.parameters.filePostName;
    //    this.fileTypes = root.loaderInfo.parameters.fileTypes;
    //    this.fileTypesDescription = root.loaderInfo.parameters.fileTypesDescription + " (" + this.fileTypes + ")";
    //    this.loadPostParams(root.loaderInfo.parameters.params);
        if(!this.filePostName)
        {
           this.filePostName = "Filedata";
        }
        if(!this.fileTypes)
        {
           this.fileTypes = "*.*";
        }
        if(!this.fileTypesDescription)
        {
           this.fileTypesDescription = "All Files";
        }
        this.LoadFileExensions(this.fileTypes);
        try
        {
           this.debugEnabled = root.loaderInfo.parameters.debugEnabled == "true"?true:false;
        }
        catch(ex)
        {
           this.debugEnabled = false;
        }
        try
        {
           this.SetFileSizeLimit(String(root.loaderInfo.parameters.fileSizeLimit));
        }
        catch(ex)
        {
           this.fileSizeLimit = 0;
        }
        try
        {
           this.fileUploadLimit = Number(root.loaderInfo.parameters.fileUploadLimit);
           if(this.fileUploadLimit < 0)
           {
              this.fileUploadLimit = 0;
           }
        }
        catch(ex)
        {
           this.fileUploadLimit = 0;
        }
        try
        {
           this.fileQueueLimit = Number(root.loaderInfo.parameters.fileQueueLimit);
           if(this.fileQueueLimit < 0)
           {
              this.fileQueueLimit = 0;
           }
        }
        catch(ex)
        {
           this.fileQueueLimit = 0;
        }
        if(this.fileQueueLimit > this.fileUploadLimit && this.fileUploadLimit != 0)
        {
           this.fileQueueLimit = this.fileUploadLimit;
        }
        if(this.fileQueueLimit == 0 && this.fileUploadLimit != 0)
        {
           this.fileQueueLimit = this.fileUploadLimit;
        }
        try
        {
           this.useQueryString = root.loaderInfo.parameters.useQueryString == "true"?true:false;
        }
        catch(ex)
        {
           this.useQueryString = false;
        }
        try
        {
           this.requeueOnError = root.loaderInfo.parameters.requeueOnError == "true"?true:false;
        }
        catch(ex)
        {
           this.requeueOnError = false;
        }
        try
        {
           this.SetHTTPSuccess(String(root.loaderInfo.parameters.httpSuccess));
        }
        catch(ex)
        {
           this.SetHTTPSuccess([]);
        }
        try
        {
           this.SetAssumeSuccessTimeout(Number(root.loaderInfo.parameters.assumeSuccessTimeout));
        }
        catch(ex)
        {
           this.SetAssumeSuccessTimeout(0);
        }

      //  this.Debug("SWFUpload Init Complete");
      //  this.PrintDebugInfo();
    },
    SetAssumeSuccessTimeout:function(param1)
    {
       this.assumeSuccessTimeout = param1 < 0?Number(0):Number(param1);
    },
    SetFileQueueLimit:function(param1)
    {
       if(param1 < 0)
       {
          param1 = 0;
       }
       this.fileQueueLimit = param1;
    },
    LoadFileExensions:function(param1)
   {
      var _loc4_ = null;
      var _loc5_ = NaN;
      var _loc2_ = param1.split(";");
      this.valid_file_extensions = new Array();
      var _loc3_ = 0;
      while(_loc3_ < _loc2_.length)
      {
         _loc4_ = String(_loc2_[_loc3_]);
         _loc5_ = _loc4_.lastIndexOf(".");
         if(_loc5_ >= 0)
         {
            _loc4_ = _loc4_.substr(_loc5_ + 1).toLowerCase();
         }
         else
         {
            _loc4_ = _loc4_.toLowerCase();
         }
         if(_loc4_ == "*")
         {
            this.valid_file_extensions = new Array();
            break;
         }
         this.valid_file_extensions.push(_loc4_);
         _loc3_++;
      }
   },
   CheckFileType:function(param1)
   {
      if(this.valid_file_extensions.length == 0)
      {
         return true;
      }
      var _loc2_ = param1.file_reference;
      var _loc3_ = _loc2_.name.lastIndexOf(".");
      var _loc4_ = "";
      if(_loc3_ >= 0)
      {
         _loc4_ = _loc2_.name.substr(_loc3_ + 1).toLowerCase();
      }
      var _loc5_ = false;
      var _loc6_ = 0;
      while(_loc6_ < this.valid_file_extensions.length)
      {
         if(String(this.valid_file_extensions[_loc6_]) == _loc4_)
         {
            _loc5_ = true;
            break;
         }
         _loc6_++;
      }
      return _loc5_;
   },
   CheckFileSize:function(param1)
   {
  //    if(param1.file_reference)
   //   {
   //      return this.SIZE_ZERO_BYTE;
   //   }
   //   if(this.fileSizeLimit != 0 && param1.file_reference.size > this.fileSizeLimit)
   //   {
   //      return this.SIZE_TOO_BIG;
   //   }
      return this.SIZE_OK;
   },
   Select_Handler:function(param1)
   {
      var _loc4_ = NaN;
      var _loc5_ = NaN;
      var _loc6_ = null;
      var _loc7_ = null;
      var _loc8_ = false;
      var _loc9_ = NaN;
      var _loc10_ = false;
      this.Debug("Select Handler: Received the files selected from the dialog. Processing the file list...");
      var _loc2_ = 0;
      var _loc3_ = 0;
      if(this.fileUploadLimit == 0)
      {
         _loc3_ = this.fileQueueLimit == 0?Number(param1.length):Number(this.fileQueueLimit - this.queued_uploads);
      }
      else
      {
         _loc4_ = this.fileUploadLimit - this.successful_uploads - this.queued_uploads;
         if(_loc4_ < 0)
         {
            _loc4_ = 0;
         }
         if(this.fileQueueLimit == 0 || this.fileQueueLimit >= _loc4_)
         {
            _loc3_ = _loc4_;
         }
         else if(this.fileQueueLimit < _loc4_)
         {
            _loc3_ = this.fileQueueLimit - this.queued_uploads;
         }
      }
      if(_loc3_ < 0)
      {
         _loc3_ = 0;
      }
      if(_loc3_ < param1.length)
      {
         this.Debug("Event: fileQueueError : Selected Files (" + param1.length + ") exceeds remaining Queue size (" + _loc3_ + ").");
         ExternalCall.FileQueueError(this.fileQueueError_Callback,this.ERROR_CODE_QUEUE_LIMIT_EXCEEDED,null,_loc3_.toString());
      }
      else
      {
         _loc5_ = 0;
         while(_loc5_ < param1.length)
         {
            _loc6_ = new FileItem(param1[_loc5_],this.movieName,this.file_index.length);
            this.file_index[_loc6_.index] = _loc6_;
            _loc7_ = _loc6_.ToJavaScriptObject();
            _loc8_ = _loc7_.filestatus !== FileItem.FILE_STATUS_ERROR;
            if(_loc8_)
            {
               _loc9_ = this.CheckFileSize(_loc6_);
               _loc10_ = this.CheckFileType(_loc6_);
               if(_loc9_ == this.SIZE_OK && _loc10_)
               {
                  _loc6_.file_status = FileItem.FILE_STATUS_QUEUED;
                  this.file_queue.push(_loc6_);
                  this.queued_uploads++;
                  _loc2_++;
                  this.Debug("Event: fileQueued : File ID: " + _loc6_.id);
                  ExternalCall.FileQueued(this.fileQueued_Callback,_loc6_.ToJavaScriptObject());
               }
               else if(!_loc10_)
               {
                  _loc6_.file_reference = null;
                  this.queue_errors++;
                  this.Debug("Event: fileQueueError : File not of a valid type.");
                  ExternalCall.FileQueueError(this.fileQueueError_Callback,this.ERROR_CODE_INVALID_FILETYPE,_loc6_.ToJavaScriptObject(),"File is not an allowed file type.");
               }
               else if(_loc9_ == this.SIZE_TOO_BIG)
               {
                  _loc6_.file_reference = null;
                  this.queue_errors++;
                  this.Debug("Event: fileQueueError : File exceeds size limit.");
                  ExternalCall.FileQueueError(this.fileQueueError_Callback,this.ERROR_CODE_FILE_EXCEEDS_SIZE_LIMIT,_loc6_.ToJavaScriptObject(),"File size exceeds allowed limit.");
               }
               else if(_loc9_ == this.SIZE_ZERO_BYTE)
               {
                  _loc6_.file_reference = null;
                  this.queue_errors++;
                  this.Debug("Event: fileQueueError : File is zero bytes.");
                  ExternalCall.FileQueueError(this.fileQueueError_Callback,this.ERROR_CODE_ZERO_BYTE_FILE,_loc6_.ToJavaScriptObject(),"File is zero bytes and cannot be uploaded.");
               }
            }
            else
            {
               _loc6_.file_reference = null;
               this.queue_errors++;
               this.Debug("Event: fileQueueError : File is zero bytes or FileReference is invalid.");
               ExternalCall.FileQueueError(this.fileQueueError_Callback,this.ERROR_CODE_ZERO_BYTE_FILE,_loc6_.ToJavaScriptObject(),"File is zero bytes or cannot be accessed and cannot be uploaded.");
            }
            _loc5_++;
         }
      }
      this.Debug("Event: fileDialogComplete : Finished processing selected files. Files selected: " + param1.length + ". Files Queued: " + _loc2_);
      ExternalCall.FileDialogComplete(this.fileDialogComplete_Callback,param1.length,_loc2_,this.queued_uploads);
   },
   GetFile:function(param1)
   {
      var _loc3_ = null;
      var _loc4_ = NaN;
      var _loc2_ = this.FindIndexInFileQueue(param1);
      if(_loc2_ >= 0)
      {
         _loc3_ = this.file_queue[_loc2_];
      }
      else if(this.current_file_item != null)
      {
         _loc3_ = this.current_file_item;
      }
      else
      {
         _loc4_ = 0;
         while(_loc4_ < this.file_queue.length)
         {
            _loc3_ = this.file_queue[_loc4_];
            if(_loc3_ != null)
            {
               break;
            }
            _loc4_++;
         }
      }
      if(_loc3_ == null)
      {
         return null;
      }
      return _loc3_.ToJavaScriptObject();
   },
    SetHTTPSuccess:function(param1)
   {
      var status_code_strings = null;
      var http_status_string = null;
      var http_status = undefined;
      var http_status_codes = param1;
      this.httpSuccess = [];
      if(typeof http_status_codes === "string")
      {
         status_code_strings = http_status_codes.replace(" ","").split(",");
         for (status_code_strings in http_status_string)
         {
            try 
            {
               this.httpSuccess.push(Number(http_status_string));
            }
            catch(ex)
            {
               this.Debug("Could not add HTTP Success code: " + http_status_string);
            }
         }
      }
      else if(typeof http_status_codes === "object" && typeof http_status_codes.length === "number")
      {
         for (http_status of http_status_codes)
         {
            try
            {
               this.Debug("adding: " + http_status);
               this.httpSuccess.push(Number(http_status));
            }
            catch(ex)
            {
               this.Debug("Could not add HTTP Success code: " + http_status);
            }
         }
      }
   }

}

var FileItem = {
    file_id_sequence :0,
    FILE_STATUS_NEW:-6,
    id: "",
    FileItem:function(param1, param2, param3){
        var file_reference = param1;
        var control_id = param2;
        var index = param3;
        this.postObject = {};
        this.file_reference = file_reference;
        this.id = control_id + "_" + FileItem.file_id_sequence++;
        this.file_status = FileItem.FILE_STATUS_NEW;
        this.index = index;
        this.js_object = {
           "id":this.id,
           "index":this.index
        };
        console.log('size=' + file_reference.size);
        console.log('type=' + this.id);
        console.log('name=' + index);
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
    },      
   toString:function()
    {
       return "FileItem - ID: " + this.id;
    }
}
