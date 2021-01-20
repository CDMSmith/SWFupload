   class ExternalCall
   {
       
      
      function ExternalCall()
      {
         super();
      }
      
      private static function EscapeObject(param1)
      {
         var _loc2_:* = null;
         for(_loc2_ in param1)
         {
            param1[_loc2_] = EscapeMessage(param1[_loc2_]);
         }
         return param1;
      }
      
      public static function UploadStart(param1, param2)
      {
         ExternalInterface.call(param1,EscapeMessage(param2));
      }
      
      private static function EscapeMessage(param1:*) : *
      {
         if(typeof param1 === "string")
         {
            param1 = EscapeString(param1);
         }
         else if(Array.isArray(param1) )
         {
            param1 = EscapeArray(param1);
         }
         else if(typeof param1 === "object")
         {
            param1 = EscapeObject(param1);
         }
         return param1;
      }
      
      public static function UploadError(param1, param2, param3, param4)
      {
         ExternalInterface.call(param1,EscapeMessage(param3),EscapeMessage(param2),EscapeMessage(param4));
      }
      
      public static function UploadSuccess(param1:String, param2:Object, param3:String, param4:Boolean) : void
      {
         ExternalInterface.call(param1,EscapeMessage(param2),EscapeMessage(param3),EscapeMessage(param4));
      }
      
      public static function Bool(param1:String) : Boolean
      {
         return ExternalInterface.call(param1);
      }
      
      public static function UploadProgress(param1:String, param2:Object, param3:uint, param4:uint) : void
      {
         ExternalInterface.call(param1,EscapeMessage(param2),EscapeMessage(param3),EscapeMessage(param4));
      }
      
      public static function FileQueued(param1:String, param2:Object) : void
      {
         ExternalInterface.call(param1,EscapeMessage(param2));
      }
      
      public static function Simple(param1:String) : void
      {
         ExternalInterface.call(param1);
      }
      
      public static function FileQueueError(param1:String, param2:Number, param3:Object, param4:String) : void
      {
         ExternalInterface.call(param1,EscapeMessage(param3),EscapeMessage(param2),EscapeMessage(param4));
      }
      
      private static function EscapeArray(param1:Array) : Array
      {
         var _loc2_:uint = param1.length;
         var _loc3_:uint = 0;
         while(_loc3_ < _loc2_)
         {
            param1[_loc3_] = EscapeMessage(param1[_loc3_]);
            _loc3_++;
         }
         return param1;
      }
      
      private static function EscapeString(param1:String) : String
      {
         var _loc2_:RegExp = /\\/g;
         return param1.replace(_loc2_,"\\\\");
      }
      
      public static function Debug(param1:String, param2:String) : void
      {
         ExternalInterface.call(param1,EscapeMessage(param2));
      }
      
      public static function UploadComplete(param1:String, param2:Object) : void
      {
         ExternalInterface.call(param1,EscapeMessage(param2));
      }
      
      function FileDialogComplete(param1:String, param2:Number, param3:Number, param4:Number) : void
      {
         ExternalInterface.call(param1,EscapeMessage(param2),EscapeMessage(param3),EscapeMessage(param4));
      }
   }

