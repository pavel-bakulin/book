<?php
	class ImagesLoad{
        private $imagesLoaded = array();
    
        function __construct(){
        }
        
        public function newImageCreate($_files, $path){
            //Loop through each file
            //for($i = 0; $i < count($_FILES['file']['name']); $i++) {
                //Get the temp file path
                $tmpFilePath = $_FILES['file']['tmp_name'];
                //Make sure we have a filepath
                if ($tmpFilePath != ""){
                    //Setup our new file path
                    $file_name =  iconv('utf-8','windows-1251',strtolower($_FILES['file']['name']));
                    
                    $filePath = $path . "/" . $file_name;
                    $this->imagesLoaded[] = rawurlencode($filePath);
                    //Upload the file into the temp dir
                    if( $_FILES['file']['size'] > 1024*5*1024){                      
                        echo("<script type='text/javascript'>alert('Размер файла превышает три мегабайта!');location.replace('" . $_SERVER['REQUEST_URI'] . "');</script>'");
                        exit;
                    }
                    // Allowed image types
                    $allowtype = array('bmp', 'BMP', 'gif' , 'GIF', 'jpg', 'JPG', 'jpeg', 'JPEG' , 'gif', 'GIF', 'png', 'PNG');
                    
                    $type_arr = explode(".", strtolower($file_name));
                    $type = end($type_arr);
                    if(in_array($type, $allowtype) === false){    
                        echo("<script type='text/javascript'>alert('Недопустимый формат файла!');location.replace('" . $_SERVER['REQUEST_URI'] . "');</script>");
                        exit;
                    }                    
                    if(move_uploaded_file($tmpFilePath, $filePath)) {
                        //Handle other code here
                        return $file_name;
                    }
                }
            //}
        }
        
        private function fileCopy($filepath,$newfilepath){
            if(!copy($filepath,$newfilepath)){
                echo("<script type='text/javascript'>alert('Не удалось скопировать файл!');location.replace('" . $_SERVER['REQUEST_URI'] . "');</script>");
            }
        }
        //$change parametr  shows  to change picture or not if it is bigger that original size
        public function imageSizeChange($filepath, $newfilepath, $width, $height, $change){
            $size_img = getimagesize($filepath);
          
            if($height == 0){
                $src_ratio = $size_img[1]/$size_img[0];            
                if($change == 0){
                    if($size_img[0] > $width) {
                        $height = $src_ratio * $width;
                    } else {
                        $this->fileCopy($filepath,$newfilepath);
                        return 0;
                    }
                } else {
                    $height = $src_ratio * $width;
                }
            }    

            if($width == 0){
                $src_ratio = $size_img[0]/$size_img[1];            
                if($change == 0){
                    if($size_img[0] > $width) {
                        $width = $src_ratio * $height;
                    } else {
                        $this->fileCopy($filepath,$newfilepath);
                        return 0;
                    }
                } else {
                    $width = $src_ratio * $height;
                }
            }    
            
            $src_img = null;
            switch ($size_img[2]) {
                case 1:
                    $src_img = imagecreatefromgif($filepath);
                    break;
                case 2:
                    $src_img = imagecreatefromjpeg($filepath);
                    break;
                case 3:
                    $src_img = imagecreatefrompng($filepath);
                    break;  
                case 15:
                    $src_img = imagecreatefromwbmp($filepath);
                    break;   
            }
            
            $destination_img = imagecreatetruecolor($width,$height);
            
            $path_parts = pathinfo($filepath);   
            if($path_parts["extension"] == "png"){    
                imagealphablending($destination_img, false);      
                $transparent = imagecolorallocatealpha($destination_img, 255, 255, 255, 127); 
                imagefilledrectangle($destination_img, 0, 0, $width_small,$height_small, $transparent);       
                imagesavealpha($destination_img, true);                
            }
            
            if (!imagecopyresampled($destination_img,$src_img,0,0,0,0,$width,$height,$size_img[0],$size_img[1])) return false;
                        
            switch ($path_parts["extension"]) {
                case "jpg":
                    imagejpeg($destination_img,$newfilepath);
                    break;
                case "jpeg":
                    imagejpeg($destination_img,$newfilepath);
                    break;                    
                case "gif":
                    imagegif($destination_img,$newfilepath);
                    break;
                case "png":
                    $color = imagecolorallocatealpha($destination_img,0x00,0x00,0x00,127);
                    imagefill($destination_img, 0, 0, $color); 
                    imagepng($destination_img,$newfilepath);
                    break;      
            }
            
            imagedestroy($destination_img);
            imagedestroy($src_img);  
        }
        
        public function getNameImagesLoaded(){
            return json_encode($this->imagesLoaded);
        }
    }

?>