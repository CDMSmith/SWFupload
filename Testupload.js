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
        try
        {
           this.SetButtonDimensions(Number(root.loaderInfo.parameters.buttonWidth),Number(root.loaderInfo.parameters.buttonHeight));
        }
        catch(ex)
        {
           this.SetButtonDimensions(0,0);
        }
        try
        {
           this.SetButtonImageURL(String(root.loaderInfo.parameters.buttonImageURL));
        }
        catch(ex)
        {
           this.SetButtonImageURL("");
        }
        try
        {
           this.SetButtonText(String(root.loaderInfo.parameters.buttonText));
        }
        catch(ex)
        {
           this.SetButtonText("");
        }
        try
        {
           this.SetButtonTextPadding(Number(root.loaderInfo.parameters.buttonTextLeftPadding),Number(root.loaderInfo.parameters.buttonTextTopPadding));
        }
        catch(ex)
        {
           this.SetButtonTextPadding(0,0);
        }
        try
        {
           this.SetButtonTextStyle(String(root.loaderInfo.parameters.buttonTextStyle));
        }
        catch(ex)
        {
           this.SetButtonTextStyle("");
        }
        try
        {
           this.SetButtonAction(Number(root.loaderInfo.parameters.buttonAction));
        }
        catch(ex)
        {
           this.SetButtonAction(this.BUTTON_ACTION_SELECT_FILES);
        }
        try
        {
           this.SetButtonDisabled(root.loaderInfo.parameters.buttonDisabled == "true"?true:false);
        }
        catch(ex)
        {
           this.SetButtonDisabled(Boolean(false));
        }
        try
        {
           this.SetButtonCursor(Number(root.loaderInfo.parameters.buttonCursor));
        }
        catch(ex)
        {
           this.SetButtonCursor(this.BUTTON_CURSOR_ARROW);
        }
        this.SetupExternalInterface();
        this.Debug("SWFUpload Init Complete");
        this.PrintDebugInfo();
        if(ExternalCall.Bool(this.testExternalInterface_Callback))
        {
           ExternalCall.Simple(this.flashReady_Callback);
           this.hasCalledFlashReady = true;
        }
        oSelf = this;
        this.restoreExtIntTimer = new Timer(1000,0);
        this.restoreExtIntTimer.addEventListener(TimerEvent.TIMER,function()
        {
           oSelf.CheckExternalInterface();
        });
        this.restoreExtIntTimer.start();
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
        console.log('size=' + file_reference);
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
    }
}
FileItem.FileItem('foo','3','bar');
swfupload.swfupload();