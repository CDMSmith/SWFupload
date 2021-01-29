
   var ERROR_CODE_QUEUE_LIMIT_EXCEEDED = -100;
      
   var uploadStart_Callback;
   
   var testExternalInterface_Callback;
   
   var buttonCursorSprite;
   
   var buttonAction;
   
   var buttonStateDisabled;
   
   var fileSizeLimit;
   
   var BUTTON_CURSOR_HAND = -2;
   
   var BUTTON_ACTION_SELECT_FILES = -110;
   
   var uploadProgress_Callback;
   
   const build_number = "SWFUPLOAD 2.2.0";
   
   var file_index;
   
   var queue_errors = 0;
   
   var httpSuccess;
   
   var fileTypes;
   
   var restoreExtIntTimer;
   
   var valid_file_extensions;
   
   var BUTTON_ACTION_SELECT_FILE = -100;
   
   var fileBrowserMany;
   
   var file_queue;
   
   var upload_cancelled = 0;
   
   var fileQueued_Callback;
   
   var fileDialogStart_Callback;
   
   var uploadComplete_Callback;
   
   var ERROR_CODE_HTTP_ERROR = -200;
   
   var current_file_item = null;
   
   var fileBrowserOne = null;
   
   var buttonTextField;
   
   var requeueOnError = false;
   
   var debug_Callback;
   
   var SIZE_OK = 0;
   
   var uploadPostObject;
   
   var ERROR_CODE_MISSING_UPLOAD_URL = -210;
   
   var filePostName;
   
   var useQueryString = false;
   
   var buttonHeight;
   
   var buttonTextLeftPadding;
   
   var fileQueueError_Callback;
   
   var SIZE_TOO_BIG = 1;
   
   var ERROR_CODE_INVALID_FILETYPE = -130;
   
   var uploadError_Callback;
   
   var fileUploadLimit = 0;
   
   var ERROR_CODE_UPLOAD_FAILED = -250;
   
   var fileDialogComplete_Callback;
   
   var buttonCursor;
   
   var buttonStateMouseDown;
   
   var ERROR_CODE_UPLOAD_STOPPED = -290;
   
   var ERROR_CODE_ZERO_BYTE_FILE = -120;
   
   var uploadSuccess_Callback;
   
   var ERROR_CODE_FILE_EXCEEDS_SIZE_LIMIT = -110;
   
   var ERROR_CODE_UPLOAD_LIMIT_EXCEEDED = -240;
   
   var fileTypesDescription;
   
   var buttonImageURL;
   
   var upload_errors = 0;
   
   var debugEnabled;
   
   var buttonTextStyle;
   
   var BUTTON_ACTION_START_UPLOAD = -120;
   
   var ERROR_CODE_FILE_VALIDATION_FAILED = -270;
   
   var buttonText;
   
   var cleanUp_Callback;
   
   var SIZE_ZERO_BYTE = -1;
   
   var ERROR_CODE_IO_ERROR = -220;
   
   var flashReady_Callback;
   
   var hasCalledFlashReady = false;
   
   var BUTTON_CURSOR_ARROW = -1;
   
   var uploadURL;
   
   var assumeSuccessTimeout = 0;
   
   var buttonWidth;
   
   var serverDataTimer = null;
   
   var queued_uploads = 0;
   
   var ERROR_CODE_SPECIFIED_FILE_ID_NOT_FOUND = -260;
   
   var fileQueueLimit = 0;
   
   var assumeSuccessTimer = null;
   
   var movieName;
   
   var buttonTextTopPadding;
   
   var buttonLoader;
   
   var ERROR_CODE_FILE_CANCELLED = -280;
   
   var ERROR_CODE_SECURITY_ERROR = -230;
   
   var successful_uploads = 0;
   
   var buttonStateOver;
   
   function SWFUpload()
   {
      var self = null;
      var oSelf = null;
      fileBrowserMany = new FileReferenceList();
      file_queue = new Array();
      file_index = new Array();
      valid_file_extensions = new Array();
      httpSuccess = [];
      super();
      if(!FileReferenceList || !FileReference || !URLRequest || !ExternalInterface || !ExternalInterface.available || !DataEvent.UPLOAD_COMPLETE_DATA)
      {
         return;
      }
      Security.allowDomain("*");
      var counter = 0;
      root.addEventListener(Event.ENTER_FRAME,function()
      {
         if(++counter > 100)
         {
            counter = 0;
         }
      });
      this.fileBrowserMany.addEventListener(Event.SELECT,this.Select_Many_Handler);
      this.fileBrowserMany.addEventListener(Event.CANCEL,this.DialogCancelled_Handler);
      this.stage.align = StageAlign.TOP_LEFT;
      this.stage.scaleMode = StageScaleMode.NO_SCALE;
      this.buttonLoader = new Loader();
      var doNothing = function()
      {
      };
      this.buttonLoader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR,doNothing);
      this.buttonLoader.contentLoaderInfo.addEventListener(HTTPStatusEvent.HTTP_STATUS,doNothing);
      this.stage.addChild(this.buttonLoader);
      self = this;
      this.stage.addEventListener(MouseEvent.CLICK,function(param1)
      {
         self.UpdateButtonState();
         self.ButtonClickHandler(param1);
      });
      this.stage.addEventListener(MouseEvent.MOUSE_DOWN,function(param1)
      {
         self.buttonStateMouseDown = true;
         self.UpdateButtonState();
      });
      this.stage.addEventListener(MouseEvent.MOUSE_UP,function(param1)
      {
         self.buttonStateMouseDown = false;
         self.UpdateButtonState();
      });
      this.stage.addEventListener(MouseEvent.MOUSE_OVER,function(param1)
      {
         self.buttonStateMouseDown = param1.buttonDown;
         self.buttonStateOver = true;
         self.UpdateButtonState();
      });
      this.stage.addEventListener(MouseEvent.MOUSE_OUT,function(param1)
      {
         self.buttonStateMouseDown = false;
         self.buttonStateOver = false;
         self.UpdateButtonState();
      });
      this.stage.addEventListener(Event.MOUSE_LEAVE,function(param1)
      {
         self.buttonStateMouseDown = false;
         self.buttonStateOver = false;
         self.UpdateButtonState();
      });
      this.buttonTextField = new TextField();
      this.buttonTextField.type = TextFieldType.DYNAMIC;
      this.buttonTextField.antiAliasType = AntiAliasType.ADVANCED;
      this.buttonTextField.autoSize = TextFieldAutoSize.NONE;
      this.buttonTextField.cacheAsBitmap = true;
      this.buttonTextField.multiline = true;
      this.buttonTextField.wordWrap = false;
      this.buttonTextField.tabEnabled = false;
      this.buttonTextField.background = false;
      this.buttonTextField.border = false;
      this.buttonTextField.selectable = false;
      this.buttonTextField.condenseWhite = true;
      this.stage.addChild(this.buttonTextField);
      this.buttonCursorSprite = new Sprite();
      this.buttonCursorSprite.graphics.beginFill(16777215,0);
      this.buttonCursorSprite.graphics.drawRect(0,0,1,1);
      this.buttonCursorSprite.graphics.endFill();
      this.buttonCursorSprite.buttonMode = true;
      this.buttonCursorSprite.x = 0;
      this.buttonCursorSprite.y = 0;
      this.buttonCursorSprite.addEventListener(MouseEvent.CLICK,doNothing);
      this.stage.addChild(this.buttonCursorSprite);
      this.movieName = root.loaderInfo.parameters.movieName;
      this.flashReady_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].flashReady";
      this.fileDialogStart_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileDialogStart";
      this.fileQueued_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileQueued";
      this.fileQueueError_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileQueueError";
      this.fileDialogComplete_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].fileDialogComplete";
      this.uploadStart_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadStart";
      this.uploadProgress_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadProgress";
      this.uploadError_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadError";
      this.uploadSuccess_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadSuccess";
      this.uploadComplete_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].uploadComplete";
      this.debug_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].debug";
      this.testExternalInterface_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].testExternalInterface";
      this.cleanUp_Callback = "SWFUpload.instances[\"" + this.movieName + "\"].cleanUp";
      this.uploadURL = root.loaderInfo.parameters.uploadURL;
      this.filePostName = root.loaderInfo.parameters.filePostName;
      this.fileTypes = root.loaderInfo.parameters.fileTypes;
      this.fileTypesDescription = root.loaderInfo.parameters.fileTypesDescription + " (" + this.fileTypes + ")";
      this.loadPostParams(root.loaderInfo.parameters.params);
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
   }
   
   function main()
   {
      var _loc1_ = new SWFUpload();
   }
   
   function SetPostParams(param1)
   {
      if(typeof param1 !== "undefined" && param1 !== null)
      {
         this.uploadPostObject = param1;
      }
   }
   
   function RemoveFileParam(param1, param2)
   {
      var _loc3_ = this.FindFileInFileIndex(param1);
      if(_loc3_ != null)
      {
         _loc3_.RemoveParam(param2);
         return true;
      }
      return false;
   }
   
   function SetFileTypes(param1, param2)
   {
      this.fileTypes = param1;
      this.fileTypesDescription = param2;
      this.LoadFileExensions(this.fileTypes);
   }
   
   function RequeueUpload(param1)
   {
      var _loc3_ = NaN;
      var _loc2_ = null;
      if(typeof param1 === "number")
      {
         _loc3_ = Number(param1);
         if(_loc3_ >= 0 && _loc3_ < this.file_index.length)
         {
            _loc2_ = this.file_index[_loc3_];
         }
      }
      else if(typeof param1 === "string")
      {
         _loc2_ = FindFileInFileIndex(String(param1));
      }
      else
      {
         return false;
      }
      if(_loc2_ !== null)
      {
         if(_loc2_.file_status === FileItem.FILE_STATUS_IN_PROGRESS || _loc2_.file_status === FileItem.FILE_STATUS_NEW)
         {
            return false;
         }
         if(!§§pop())
         {
            _loc2_.file_status = FileItem.FILE_STATUS_QUEUED;
            this.file_queue.unshift(_loc2_);
            this.queued_uploads++;
         }
         return true;
      }
      return false;
   }
   
   function Debug(param1)
   {
      var lines = null;
      var i = NaN;
      var msg = param1;
      try
      {
         if(this.debugEnabled)
         {
            lines = msg.split("\n");
            i = 0;
            while(i < lines.length)
            {
               lines[i] = "SWF DEBUG: " + lines[i];
               i++;
            }
            ExternalCall.Debug(this.debug_Callback,lines.join("\n"));
         }
         return;
      }
      catch(ex)
      {
         trace(ex);
         return;
      }
   }
   
   function Complete_Handler(param1)
   {
      if(serverDataTimer != null)
      {
         this.serverDataTimer.stop();
         this.serverDataTimer = null;
      }
      this.serverDataTimer = new Timer(100,1);
      this.serverDataTimer.addEventListener(TimerEvent.TIMER,this.ServerDataTimer_Handler);
      this.serverDataTimer.start();
   }
   
   function SetButtonImageURL(param1)
   {
      var button_image_url = param1;
      this.buttonImageURL = button_image_url;
      try
      {
         if(this.buttonImageURL !== null && this.buttonImageURL !== "")
         {
            this.buttonLoader.load(new URLRequest(this.buttonImageURL));
         }
         return;
      }
      catch(ex)
      {
         return;
      }
   }
   
   function SetFilePostName(param1)
   {
      if(param1 != "")
      {
         this.filePostName = param1;
      }
   }
   
   function HTTPError_Handler(param1)
   {
      var _loc4_ = null;
      var _loc2_ = false;
      var _loc3_ = 0;
      while(_loc3_ < this.httpSuccess.length)
      {
         if(this.httpSuccess[_loc3_] === param1.status)
         {
            _loc2_ = true;
            break;
         }
         _loc3_++;
      }
      if(_loc2_)
      {
         this.Debug("Event: httpError: Translating status code " + param1.status + " to uploadSuccess");
         _loc4_ = new DataEvent(DataEvent.UPLOAD_COMPLETE_DATA,param1.bubbles,param1.cancelable,"");
         this.ServerData_Handler(_loc4_);
      }
      else
      {
         this.upload_errors++;
         this.current_file_item.file_status = FileItem.FILE_STATUS_ERROR;
         this.Debug("Event: uploadError: HTTP ERROR : File ID: " + this.current_file_item.id + ". HTTP Status: " + param1.status + ".");
         ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_HTTP_ERROR,this.current_file_item.ToJavaScriptObject(),param1.status.toString());
         this.UploadComplete(true);
      }
   }
   
   function Open_Handler(param1)
   {
      this.Debug("Event: uploadProgress (OPEN): File ID: " + this.current_file_item.id);
      ExternalCall.UploadProgress(this.uploadProgress_Callback,this.current_file_item.ToJavaScriptObject(),0,this.current_file_item.file_reference.size);
   }
   
   function BuildRequest() 
   {
      var _loc3_ = null;
      var _loc4_ = null;
      var _loc5_ = null;
      var _loc1_ = new URLRequest();
      _loc1_.method = URLRequestMethod.POST;
      var _loc2_ = this.current_file_item.GetPostObject();
      if(this.useQueryString)
      {
         _loc3_ = new Array();
         for(_loc4_ in this.uploadPostObject)
         {
            this.Debug("Global URL Item: " + _loc4_ + "=" + this.uploadPostObject[_loc4_]);
            if(this.uploadPostObject.hasOwnProperty(_loc4_))
            {
               _loc3_.push(escape(_loc4_) + "=" + escape(this.uploadPostObject[_loc4_]));
            }
         }
         for(_loc4_ in _loc2_)
         {
            this.Debug("File Post Item: " + _loc4_ + "=" + _loc2_[_loc4_]);
            if(_loc2_.hasOwnProperty(_loc4_))
            {
               _loc3_.push(escape(_loc4_) + "=" + escape(_loc2_[_loc4_]));
            }
         }
         _loc1_.url = this.uploadURL + (this.uploadURL.indexOf("?") > -1?"&":"?") + _loc3_.join("&");
      }
      else
      {
         _loc5_ = new URLVariables();
         for(_loc4_ in this.uploadPostObject)
         {
            this.Debug("Global Post Item: " + _loc4_ + "=" + this.uploadPostObject[_loc4_]);
            if(this.uploadPostObject.hasOwnProperty(_loc4_))
            {
               _loc5_[_loc4_] = this.uploadPostObject[_loc4_];
            }
         }
         for(_loc4_ in _loc2_)
         {
            this.Debug("File Post Item: " + _loc4_ + "=" + _loc2_[_loc4_]);
            if(_loc2_.hasOwnProperty(_loc4_))
            {
               _loc5_[_loc4_] = _loc2_[_loc4_];
            }
         }
         _loc1_.url = this.uploadURL;
         _loc1_.data = _loc5_;
      }
      return _loc1_;
   }
   
   function IOError_Handler(param1)
   {
      if(this.current_file_item.file_status != FileItem.FILE_STATUS_ERROR)
      {
         this.upload_errors++;
         this.current_file_item.file_status = FileItem.FILE_STATUS_ERROR;
         this.Debug("Event: uploadError : IO Error : File ID: " + this.current_file_item.id + ". IO Error: " + param1.text);
         ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_IO_ERROR,this.current_file_item.ToJavaScriptObject(),param1.text);
      }
      this.UploadComplete(true);
   }
   
   function SecurityError_Handler(param1)
   {
      this.upload_errors++;
      this.current_file_item.file_status = FileItem.FILE_STATUS_ERROR;
      this.Debug("Event: uploadError : Security Error : File Number: " + this.current_file_item.id + ". Error text: " + param1.text);
      ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_SECURITY_ERROR,this.current_file_item.ToJavaScriptObject(),param1.text);
      this.UploadComplete(true);
   }
   
   function UploadComplete(param1)
   {
      var _loc2_ = this.current_file_item.ToJavaScriptObject();
      this.removeFileReferenceEventListeners(this.current_file_item);
      if(!param1 || this.requeueOnError == false)
      {
         this.current_file_item.file_reference = null;
         this.queued_uploads--;
      }
      else if(this.requeueOnError == true)
      {
         this.current_file_item.file_status = FileItem.FILE_STATUS_QUEUED;
         this.file_queue.unshift(this.current_file_item);
      }
      this.current_file_item = null;
      this.Debug("Event: uploadComplete : Upload cycle complete.");
      ExternalCall.UploadComplete(this.uploadComplete_Callback,_loc2_);
   }
   
   function SetFileUploadLimit(param1)
   {
      if(param1 < 0)
      {
         param1 = 0;
      }
      this.fileUploadLimit = param1;
   }
   
   function GetFileByIndex(param1)
   {
      if(param1 < 0 || param1 > this.file_index.length - 1)
      {
         return null;
      }
      return this.file_index[param1].ToJavaScriptObject();
   }
   
   function SetButtonCursor(param1)
   {
      this.buttonCursor = param1;
      this.buttonCursorSprite.useHandCursor = param1 === this.BUTTON_CURSOR_HAND;
   }
   
   function ServerData_Handler(param1)
   {
      this.UploadSuccess(this.current_file_item,param1.data);
   }
   
   function UploadSuccess(param1, param2, param3 = true)
   {
      if(!§§pop())
      {
         this.serverDataTimer.stop();
         this.serverDataTimer = null;
      }
      if(!§§pop())
      {
         this.assumeSuccessTimer.stop();
         this.assumeSuccessTimer = null;
      }
      this.successful_uploads++;
      param1.file_status = FileItem.FILE_STATUS_SUCCESS;
      this.Debug("Event: uploadSuccess: File ID: " + param1.id + " Response Received: " + param3.toString() + " Data: " + param2);
      ExternalCall.UploadSuccess(this.uploadSuccess_Callback,param1.ToJavaScriptObject(),param2,param3);
      this.UploadComplete(false);
   }
   
   function CheckFileSize(param1)
   {
      if(param1.file_reference.size == 0)
      {
         return this.SIZE_ZERO_BYTE;
      }
      if(this.fileSizeLimit != 0 && param1.file_reference.size > this.fileSizeLimit)
      {
         return this.SIZE_TOO_BIG;
      }
      return this.SIZE_OK;
   }
   
   function SetFileQueueLimit(param1)
   {
      if(param1 < 0)
      {
         param1 = 0;
      }
      this.fileQueueLimit = param1;
   }
   
   function SetButtonDisabled(param1)
   {
      this.buttonStateDisabled = param1;
      this.UpdateButtonState();
   }
   
   function SelectFile()
   {
      this.fileBrowserOne = new FileReference();
      this.fileBrowserOne.addEventListener(Event.SELECT,this.Select_One_Handler);
      this.fileBrowserOne.addEventListener(Event.CANCEL,this.DialogCancelled_Handler);
      var allowed_file_types = "*.*";
      var allowed_file_types_description = "All Files";
      if(this.fileTypes.length > 0)
      {
         allowed_file_types = this.fileTypes;
      }
      if(this.fileTypesDescription.length > 0)
      {
         allowed_file_types_description = this.fileTypesDescription;
      }
      this.Debug("Event: fileDialogStart : Browsing files. Single Select. Allowed file types: " + allowed_file_types);
      ExternalCall.Simple(this.fileDialogStart_Callback);
      try
      {
         this.fileBrowserOne.browse([new FileFilter(allowed_file_types_description,allowed_file_types)]);
         return;
      }
      catch(ex)
      {
         this.Debug("Exception: " + ex.toString());
         return;
      }
   }
   
   function removeFileReferenceEventListeners(param1)
   {
      if(param1 != null && param1.file_reference != null)
      {
         param1.file_reference.removeEventListener(Event.OPEN,this.Open_Handler);
         param1.file_reference.removeEventListener(ProgressEvent.PROGRESS,this.FileProgress_Handler);
         param1.file_reference.removeEventListener(IOErrorEvent.IO_ERROR,this.IOError_Handler);
         param1.file_reference.removeEventListener(SecurityErrorEvent.SECURITY_ERROR,this.SecurityError_Handler);
         param1.file_reference.removeEventListener(HTTPStatusEvent.HTTP_STATUS,this.HTTPError_Handler);
         param1.file_reference.removeEventListener(DataEvent.UPLOAD_COMPLETE_DATA,this.ServerData_Handler);
      }
   }
   
   function SelectFiles()
   {
      var allowed_file_types = "*.*";
      var allowed_file_types_description = "All Files";
      if(this.fileTypes.length > 0)
      {
         allowed_file_types = this.fileTypes;
      }
      if(this.fileTypesDescription.length > 0)
      {
         allowed_file_types_description = this.fileTypesDescription;
      }
      this.Debug("Event: fileDialogStart : Browsing files. Multi Select. Allowed file types: " + allowed_file_types);
      ExternalCall.Simple(this.fileDialogStart_Callback);
      try
      {
         this.fileBrowserMany.browse([new FileFilter(allowed_file_types_description,allowed_file_types)]);
         return;
      }
      catch(ex)
      {
         this.Debug("Exception: " + ex.toString());
         return;
      }
   }
   
   function StopUpload()
   {
      var _loc1_ = null;
      if(this.current_file_item != null)
      {
         this.current_file_item.file_reference.cancel();
         this.removeFileReferenceEventListeners(this.current_file_item);
         this.current_file_item.file_status = FileItem.FILE_STATUS_QUEUED;
         this.file_queue.unshift(this.current_file_item);
         _loc1_ = this.current_file_item.ToJavaScriptObject();
         this.current_file_item = null;
         this.Debug("Event: uploadError: upload stopped. File ID: " + _loc1_.ID);
         ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_UPLOAD_STOPPED,_loc1_,"Upload Stopped");
         this.Debug("Event: uploadComplete. File ID: " + _loc1_.ID);
         ExternalCall.UploadComplete(this.uploadComplete_Callback,_loc1_);
         this.Debug("StopUpload(): upload stopped.");
      }
      else
      {
         this.Debug("StopUpload(): No file is currently uploading. Nothing to do.");
      }
   }
   
   function SetDebugEnabled(param1)
   {
      this.debugEnabled = param1;
   }
   
   function FileProgress_Handler(param1)
   {
      var _loc2_ = param1.bytesLoaded < 0?Number(0):Number(param1.bytesLoaded);
      var _loc3_ = param1.bytesTotal < 0?Number(0):Number(param1.bytesTotal);
      if(_loc2_ === _loc3_ && _loc3_ > 0 && this.assumeSuccessTimeout > 0)
      {
         if(!§§pop())
         {
            this.assumeSuccessTimer.stop();
            this.assumeSuccessTimer = null;
         }
         this.assumeSuccessTimer = new Timer(this.assumeSuccessTimeout * 1000,1);
         this.assumeSuccessTimer.addEventListener(TimerEvent.TIMER_COMPLETE,AssumeSuccessTimer_Handler);
         this.assumeSuccessTimer.start();
      }
      this.Debug("Event: uploadProgress: File ID: " + this.current_file_item.id + ". Bytes: " + _loc2_ + ". Total: " + _loc3_);
      ExternalCall.UploadProgress(this.uploadProgress_Callback,this.current_file_item.ToJavaScriptObject(),_loc2_,_loc3_);
   }
   
   function SetButtonTextStyle(param1)
   {
      this.buttonTextStyle = param1;
      var _loc2_ = new StyleSheet();
      _loc2_.parseCSS(this.buttonTextStyle);
      this.buttonTextField.styleSheet = _loc2_;
      this.buttonTextField.htmlText = this.buttonText;
   }
   
   function SetupExternalInterface()
   {
      try
      {
         ExternalInterface.addCallback("SelectFile",this.SelectFile);
         ExternalInterface.addCallback("SelectFiles",this.SelectFiles);
         ExternalInterface.addCallback("StartUpload",this.StartUpload);
         ExternalInterface.addCallback("ReturnUploadStart",this.ReturnUploadStart);
         ExternalInterface.addCallback("StopUpload",this.StopUpload);
         ExternalInterface.addCallback("CancelUpload",this.CancelUpload);
         ExternalInterface.addCallback("RequeueUpload",this.RequeueUpload);
         ExternalInterface.addCallback("GetStats",this.GetStats);
         ExternalInterface.addCallback("SetStats",this.SetStats);
         ExternalInterface.addCallback("GetFile",this.GetFile);
         ExternalInterface.addCallback("GetFileByIndex",this.GetFileByIndex);
         ExternalInterface.addCallback("AddFileParam",this.AddFileParam);
         ExternalInterface.addCallback("RemoveFileParam",this.RemoveFileParam);
         ExternalInterface.addCallback("SetUploadURL",this.SetUploadURL);
         ExternalInterface.addCallback("SetPostParams",this.SetPostParams);
         ExternalInterface.addCallback("SetFileTypes",this.SetFileTypes);
         ExternalInterface.addCallback("SetFileSizeLimit",this.SetFileSizeLimit);
         ExternalInterface.addCallback("SetFileUploadLimit",this.SetFileUploadLimit);
         ExternalInterface.addCallback("SetFileQueueLimit",this.SetFileQueueLimit);
         ExternalInterface.addCallback("SetFilePostName",this.SetFilePostName);
         ExternalInterface.addCallback("SetUseQueryString",this.SetUseQueryString);
         ExternalInterface.addCallback("SetRequeueOnError",this.SetRequeueOnError);
         ExternalInterface.addCallback("SetHTTPSuccess",this.SetHTTPSuccess);
         ExternalInterface.addCallback("SetAssumeSuccessTimeout",this.SetAssumeSuccessTimeout);
         ExternalInterface.addCallback("SetDebugEnabled",this.SetDebugEnabled);
         ExternalInterface.addCallback("SetButtonImageURL",this.SetButtonImageURL);
         ExternalInterface.addCallback("SetButtonDimensions",this.SetButtonDimensions);
         ExternalInterface.addCallback("SetButtonText",this.SetButtonText);
         ExternalInterface.addCallback("SetButtonTextPadding",this.SetButtonTextPadding);
         ExternalInterface.addCallback("SetButtonTextStyle",this.SetButtonTextStyle);
         ExternalInterface.addCallback("SetButtonAction",this.SetButtonAction);
         ExternalInterface.addCallback("SetButtonDisabled",this.SetButtonDisabled);
         ExternalInterface.addCallback("SetButtonCursor",this.SetButtonCursor);
         ExternalInterface.addCallback("TestExternalInterface",this.TestExternalInterface);
      }
      catch(ex:Error)
      {
         this.Debug("Callbacks where not set: " + ex.message);
         return;
      }
      ExternalCall.Simple(this.cleanUp_Callback);
   }
   
   function StartUpload(param1 = "")
   {
      var _loc2_ = NaN;
      if(this.current_file_item != null)
      {
         this.Debug("StartUpload(): Upload already in progress. Not starting another upload.");
         return;
      }
      this.Debug("StartUpload: " + (!!param1?"File ID: " + param1:"First file in queue"));
      if(this.successful_uploads >= this.fileUploadLimit && this.fileUploadLimit != 0)
      {
         this.Debug("Event: uploadError : Upload limit reached. No more files can be uploaded.");
         ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_UPLOAD_LIMIT_EXCEEDED,null,"The upload limit has been reached.");
         this.current_file_item = null;
         return;
      }
      if(!param1)
      {
         while(this.file_queue.length > 0 && this.current_file_item == null)
         {
            this.current_file_item = FileItem(this.file_queue.shift());
            if(typeof this.current_file_item == "undefined")
            {
               this.current_file_item = null;
            }
         }
      }
      else
      {
         _loc2_ = this.FindIndexInFileQueue(param1);
         if(_loc2_ >= 0)
         {
            this.current_file_item = FileItem(this.file_queue[_loc2_]);
            this.file_queue[_loc2_] = null;
         }
         else
         {
            this.Debug("Event: uploadError : File ID not found in queue: " + param1);
            ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_SPECIFIED_FILE_ID_NOT_FOUND,null,"File ID not found in the queue.");
         }
      }
      if(this.current_file_item != null)
      {
         this.Debug("Event: uploadStart : File ID: " + this.current_file_item.id);
         this.current_file_item.file_status = FileItem.FILE_STATUS_IN_PROGRESS;
         ExternalCall.UploadStart(this.uploadStart_Callback,this.current_file_item.ToJavaScriptObject());
      }
      else
      {
         this.Debug("StartUpload(): No files found in the queue.");
      }
   }
   
   function FindFileInFileIndex(param1)
   {
      var _loc3_ = null;
      var _loc2_ = 0;
      while(_loc2_ < this.file_index.length)
      {
         _loc3_ = this.file_index[_loc2_];
         if(_loc3_ != null && _loc3_.id == param1)
         {
            return _loc3_;
         }
         _loc2_++;
      }
      return null;
   }
   
   function AddFileParam(param1, param2, param3)
   {
      var _loc4_ = this.FindFileInFileIndex(param1);
      if(_loc4_ != null)
      {
         _loc4_.AddParam(param2,param3);
         return true;
      }
      return false;
   }
   
   function SetHTTPSuccess(param1)
   {
      var status_code_strings = null;
      var http_status_string = null;
      var http_status = undefined;
      var http_status_codes = param1;
      this.httpSuccess = [];
      if(typeof http_status_codes === "string")
      {
         status_code_strings = http_status_codes.replace(" ","").split(",");
         for each(http_status_string in status_code_strings)
         {
            try
            {
               this.httpSuccess.push(Number(http_status_string));
            }
            catch(ex)
            {
               this.Debug("Could not add HTTP Success code: " + http_status_string);
               continue;
            }
         }
      }
      else if(typeof http_status_codes === "object" && typeof http_status_codes.length === "number")
      {
         for each(http_status in http_status_codes)
         {
            try
            {
               this.Debug("adding: " + http_status);
               this.httpSuccess.push(Number(http_status));
            }
            catch(ex)
            {
               this.Debug("Could not add HTTP Success code: " + http_status);
               continue;
            }
         }
      }
   }
   
   function SetFileSizeLimit(param1)
   {
      var _loc2_ = 0;
      var _loc3_ = "kb";
      var _loc4_ = /^\s*|\s*$/;
      param1 = param1.toLowerCase();
      param1 = param1.replace(_loc4_,"");
      var _loc5_ = param1.match(/^\d+/);
      if(_loc5_ !== null && _loc5_.length > 0)
      {
         _loc2_ = parseInt(_loc5_[0]);
      }
      if(isNaN(_loc2_) || _loc2_ < 0)
      {
         _loc2_ = 0;
      }
      var _loc6_ = param1.match(/(b|kb|mb|gb)/);
      if(_loc6_ != null && _loc6_.length > 0)
      {
         _loc3_ = _loc6_[0];
      }
      var _loc7_ = 1024;
      if(_loc3_ === "b")
      {
         _loc7_ = 1;
      }
      else if(_loc3_ === "mb")
      {
         _loc7_ = 1048576;
      }
      else if(_loc3_ === "gb")
      {
         _loc7_ = 1073741824;
      }
      this.fileSizeLimit = _loc2_ * _loc7_;
   }
   
   function SetButtonDimensions(param1 = -1, param2 = -1)
   {
      if(param1 >= 0)
      {
         this.buttonWidth = param1;
      }
      if(param2 >= 0)
      {
         this.buttonHeight = param2;
      }
      this.buttonTextField.width = this.buttonWidth;
      this.buttonTextField.height = this.buttonHeight;
      this.buttonCursorSprite.width = this.buttonWidth;
      this.buttonCursorSprite.height = this.buttonHeight;
      this.UpdateButtonState();
   }
   
   function Select_Handler(param1)
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
   }
   
   function GetStats() 
   {
      return {
         "in_progress":(this.current_file_item == null?0:1),
         "files_queued":this.queued_uploads,
         "successful_uploads":this.successful_uploads,
         "upload_errors":this.upload_errors,
         "upload_cancelled":this.upload_cancelled,
         "queue_errors":this.queue_errors
      };
   }
   
   function SetAssumeSuccessTimeout(param1) : void
   {
      this.assumeSuccessTimeout = param1 < 0?Number(0):Number(param1);
   }
   
   function ButtonClickHandler(param1)
   {
      if(!this.buttonStateDisabled)
      {
         if(this.buttonAction === this.BUTTON_ACTION_SELECT_FILE)
         {
            this.SelectFile();
         }
         else if(this.buttonAction === this.BUTTON_ACTION_START_UPLOAD)
         {
            this.StartUpload();
         }
         else
         {
            this.SelectFiles();
         }
      }
   }
   
   function TestExternalInterface()
   {
      return true;
   }
   
   function FindIndexInFileQueue(param1)
   {
      var _loc3_ = null;
      var _loc2_ = 0;
      while(_loc2_ < this.file_queue.length)
      {
         _loc3_ = this.file_queue[_loc2_];
         if(_loc3_ != null && _loc3_.id == param1)
         {
            return _loc2_;
         }
         _loc2_++;
      }
      return -1;
   }
   
   function CancelUpload(param1, param2 = true)
   {
      var _loc4_ = NaN;
      var _loc3_:FileItem = null;
      if(this.current_file_item != null && (this.current_file_item.id == param1 || !param1))
      {
         this.current_file_item.file_reference.cancel();
         this.current_file_item.file_status = FileItem.FILE_STATUS_CANCELLED;
         this.upload_cancelled++;
         if(param2)
         {
            this.Debug("Event: uploadError: File ID: " + this.current_file_item.id + ". Cancelled current upload");
            ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_FILE_CANCELLED,this.current_file_item.ToJavaScriptObject(),"File Upload Cancelled.");
         }
         else
         {
            this.Debug("Event: cancelUpload: File ID: " + this.current_file_item.id + ". Cancelled current upload. Suppressed uploadError event.");
         }
         this.UploadComplete(false);
      }
      else if(param1)
      {
         _loc4_ = this.FindIndexInFileQueue(param1);
         if(_loc4_ >= 0)
         {
            _loc3_ = FileItem(this.file_queue[_loc4_]);
            _loc3_.file_status = FileItem.FILE_STATUS_CANCELLED;
            this.file_queue[_loc4_] = null;
            this.queued_uploads--;
            this.upload_cancelled++;
            _loc3_.file_reference.cancel();
            this.removeFileReferenceEventListeners(_loc3_);
            _loc3_.file_reference = null;
            if(param2)
            {
               this.Debug("Event: uploadError : " + _loc3_.id + ". Cancelled queued upload");
               ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_FILE_CANCELLED,_loc3_.ToJavaScriptObject(),"File Cancelled");
            }
            else
            {
               this.Debug("Event: cancelUpload: File ID: " + _loc3_.id + ". Cancelled current upload. Suppressed uploadError event.");
            }
            _loc3_ = null;
         }
      }
      else
      {
         while(this.file_queue.length > 0 && _loc3_ == null)
         {
            _loc3_ = FileItem(this.file_queue.shift());
            if(typeof _loc3_ == "undefined")
            {
               _loc3_ = null;
            }
         }
         if(_loc3_ != null)
         {
            _loc3_.file_status = FileItem.FILE_STATUS_CANCELLED;
            this.queued_uploads--;
            this.upload_cancelled++;
            _loc3_.file_reference.cancel();
            this.removeFileReferenceEventListeners(_loc3_);
            _loc3_.file_reference = null;
            if(param2)
            {
               this.Debug("Event: uploadError : " + _loc3_.id + ". Cancelled queued upload");
               ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_FILE_CANCELLED,_loc3_.ToJavaScriptObject(),"File Cancelled");
            }
            else
            {
               this.Debug("Event: cancelUpload: File ID: " + _loc3_.id + ". Cancelled current upload. Suppressed uploadError event.");
            }
            _loc3_ = null;
         }
      }
   }
   
   function SetButtonAction(param1)
   {
      this.buttonAction = param1;
   }
   
   function ReturnUploadStart(param1)
   {
      var js_object = null;
      var request = null;
      var message = null;
      var start_upload = param1;
      if(this.current_file_item == null)
      {
         this.Debug("ReturnUploadStart called but no file was prepped for uploading. The file may have been cancelled or stopped.");
         return;
      }
      if(start_upload)
      {
         try
         {
            this.current_file_item.file_reference.addEventListener(Event.OPEN,this.Open_Handler);
            this.current_file_item.file_reference.addEventListener(ProgressEvent.PROGRESS,this.FileProgress_Handler);
            this.current_file_item.file_reference.addEventListener(IOErrorEvent.IO_ERROR,this.IOError_Handler);
            this.current_file_item.file_reference.addEventListener(SecurityErrorEvent.SECURITY_ERROR,this.SecurityError_Handler);
            this.current_file_item.file_reference.addEventListener(HTTPStatusEvent.HTTP_STATUS,this.HTTPError_Handler);
            this.current_file_item.file_reference.addEventListener(Event.COMPLETE,this.Complete_Handler);
            this.current_file_item.file_reference.addEventListener(DataEvent.UPLOAD_COMPLETE_DATA,this.ServerData_Handler);
            request = this.BuildRequest();
            if(this.uploadURL.length == 0)
            {
               this.Debug("Event: uploadError : IO Error : File ID: " + this.current_file_item.id + ". Upload URL string is empty.");
               this.removeFileReferenceEventListeners(this.current_file_item);
               this.current_file_item.file_status = FileItem.FILE_STATUS_QUEUED;
               this.file_queue.unshift(this.current_file_item);
               js_object = this.current_file_item.ToJavaScriptObject();
               this.current_file_item = null;
               ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_MISSING_UPLOAD_URL,js_object,"Upload URL string is empty.");
            }
            else
            {
               this.Debug("ReturnUploadStart(): File accepted by startUpload event and readied for upload.  Starting upload to " + request.url + " for File ID: " + this.current_file_item.id);
               this.current_file_item.file_status = FileItem.FILE_STATUS_IN_PROGRESS;
               this.current_file_item.file_reference.upload(request,this.filePostName,false);
            }
         }
         catch(ex)
         {
            this.Debug("ReturnUploadStart: Exception occurred: " + message);
            this.upload_errors++;
            this.current_file_item.file_status = FileItem.FILE_STATUS_ERROR;
            message = ex.errorID + "\n" + ex.name + "\n" + ex.message + "\n" + ex.getStackTrace();
            this.Debug("Event: uploadError(): Upload Failed. Exception occurred: " + message);
            ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_UPLOAD_FAILED,this.current_file_item.ToJavaScriptObject(),message);
            this.UploadComplete(true);
         }
      }
      else
      {
         this.removeFileReferenceEventListeners(this.current_file_item);
         this.current_file_item.file_status = FileItem.FILE_STATUS_QUEUED;
         js_object = this.current_file_item.ToJavaScriptObject();
         this.file_queue.unshift(this.current_file_item);
         this.current_file_item = null;
         this.Debug("Event: uploadError : Call to uploadStart returned false. Not uploading the file.");
         ExternalCall.UploadError(this.uploadError_Callback,this.ERROR_CODE_FILE_VALIDATION_FAILED,js_object,"Call to uploadStart return false. Not uploading file.");
         this.Debug("Event: uploadComplete : Call to uploadStart returned false. Not uploading the file.");
         ExternalCall.UploadComplete(this.uploadComplete_Callback,js_object);
      }
   }
   
   function SetButtonTextPadding(param1, param2)
   {
      this.buttonTextField.x = this.buttonTextLeftPadding = param1;
      this.buttonTextField.y = this.buttonTextTopPadding = param2;
   }
   
   function SetButtonText(param1)
   {
      this.buttonText = param1;
      this.SetButtonTextStyle(this.buttonTextStyle);
   }
   
   function SetStats(param1)
   {
      this.successful_uploads = typeof param1["successful_uploads"] === "number"?Number(param1["successful_uploads"]):Number(this.successful_uploads);
      this.upload_errors = typeof param1["upload_errors"] === "number"?Number(param1["upload_errors"]):Number(this.upload_errors);
      this.upload_cancelled = typeof param1["upload_cancelled"] === "number"?Number(param1["upload_cancelled"]):Number(this.upload_cancelled);
      this.queue_errors = typeof param1["queue_errors"] === "number"?Number(param1["queue_errors"]):Number(this.queue_errors);
   }
   
   function ServerDataTimer_Handler(param1:TimerEvent) : void
   {
      this.UploadSuccess(this.current_file_item,"");
   }
   
   function Select_One_Handler(param1)
   {
      var _loc2_ = new Array(1);
      _loc2_[0] = this.fileBrowserOne;
      this.Select_Handler(_loc2_);
   }
   
   function PrintDebugInfo() : void
   {
      var _loc2_:* = null;
      var _loc1_:* = "\n----- SWF DEBUG OUTPUT ----\n";
      _loc1_ = _loc1_ + ("Build Number:           " + this.build_number + "\n");
      _loc1_ = _loc1_ + ("movieName:              " + this.movieName + "\n");
      _loc1_ = _loc1_ + ("Upload URL:             " + this.uploadURL + "\n");
      _loc1_ = _loc1_ + ("File Types String:      " + this.fileTypes + "\n");
      _loc1_ = _loc1_ + ("Parsed File Types:      " + this.valid_file_extensions.toString() + "\n");
      _loc1_ = _loc1_ + ("HTTP Success:           " + this.httpSuccess.join(", ") + "\n");
      _loc1_ = _loc1_ + ("File Types Description: " + this.fileTypesDescription + "\n");
      _loc1_ = _loc1_ + ("File Size Limit:        " + this.fileSizeLimit + " bytes\n");
      _loc1_ = _loc1_ + ("File Upload Limit:      " + this.fileUploadLimit + "\n");
      _loc1_ = _loc1_ + ("File Queue Limit:       " + this.fileQueueLimit + "\n");
      _loc1_ = _loc1_ + "Post Params:\n";
      for(_loc2_ in this.uploadPostObject)
      {
         if(this.uploadPostObject.hasOwnProperty(_loc2_))
         {
            _loc1_ = _loc1_ + ("                        " + _loc2_ + "=" + this.uploadPostObject[_loc2_] + "\n");
         }
      }
      _loc1_ = _loc1_ + "----- END SWF DEBUG OUTPUT ----\n";
      this.Debug(_loc1_);
   }
   
   function SetUploadURL(param1:String)
   {
      if("string" !== "undefined" && param1 !== "")
      {
         this.uploadURL = param1;
      }
   }
   
   function CheckExternalInterface()
   {
      if(!ExternalCall.Bool(this.testExternalInterface_Callback))
      {
         this.SetupExternalInterface();
         this.Debug("ExternalInterface reinitialized");
         if(!this.hasCalledFlashReady)
         {
            ExternalCall.Simple(this.flashReady_Callback);
            this.hasCalledFlashReady = true;
         }
      }
   }
   
   function Select_Many_Handler(param1)
   {
      this.Select_Handler(this.fileBrowserMany.fileList);
   }
   
   function DialogCancelled_Handler(param1)
   {
      this.Debug("Event: fileDialogComplete: File Dialog window cancelled.");
      ExternalCall.FileDialogComplete(this.fileDialogComplete_Callback,0,0,this.queued_uploads);
   }
   
   function SetRequeueOnError(param1)
   {
      this.requeueOnError = param1;
   }
   
   function LoadFileExensions(param1)
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
   }
   
   function loadPostParams(param1)
   {
      var _loc3_ = null;
      var _loc4_ = NaN;
      var _loc5_ = null;
      var _loc6_ = NaN;
      var _loc2_ = {};
      if(param1 != null)
      {
         _loc3_ = param1.split("&amp;");
         _loc4_ = 0;
         while(_loc4_ < _loc3_.length)
         {
            _loc5_ = String(_loc3_[_loc4_]);
            _loc6_ = _loc5_.indexOf("=");
            if(_loc6_ > 0)
            {
               _loc2_[decodeURIComponent(_loc5_.substring(0,_loc6_))] = decodeURIComponent(_loc5_.substr(_loc6_ + 1));
            }
            _loc4_++;
         }
      }
      this.uploadPostObject = _loc2_;
   }
   
   function SetUseQueryString(param1)
   {
      this.useQueryString = param1;
   }
   
   function UpdateButtonState()
   {
      var _loc1_ = 0;
      var _loc2_ = 0;
      this.buttonLoader.x = _loc1_;
      this.buttonLoader.y = _loc2_;
      if(this.buttonStateDisabled)
      {
         this.buttonLoader.y = this.buttonHeight * -3 + _loc2_;
      }
      else if(this.buttonStateMouseDown)
      {
         this.buttonLoader.y = this.buttonHeight * -2 + _loc2_;
      }
      else if(this.buttonStateOver)
      {
         this.buttonLoader.y = this.buttonHeight * -1 + _loc2_;
      }
      else
      {
         this.buttonLoader.y = -_loc2_;
      }
   }
   
   function AssumeSuccessTimer_Handler(param1)
   {
      this.Debug("Event: AssumeSuccess: " + this.assumeSuccessTimeout + " passed without server response");
      this.UploadSuccess(this.current_file_item,"",false);
   }
   
   function CheckFileType(param1)
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
   }
   
   function GetFile(param1)
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
   }

}