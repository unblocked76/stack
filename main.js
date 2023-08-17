window.onload = function(){
    _loopCheck()
}

function _loopCheck(){
    if(window.innerWidth > 0 && window.innerHeight > 0){
        _initRes();
        _initBundle();
        return;
    }
    window.requestAnimationFrame(() => {
        _loopCheck()
    })
}

function _initBundle(){
console.log('v7')
console.log('window size:',window.innerWidth,window.innerHeight,window.devicePixelRatio);



//window.innerWidth /= window.devicePixelRatio;
//window.innerHeight /= window.devicePixelRatio;

var showAppOutdated = function()
{
    var table = document.createElement("div"); 
    table.style.background = 'black';
    table.style.display = 'table';
    table.style.height = window.innerHeight + 'px';
    table.style.width = window.innerWidth + 'px';
    
    var tableCell = document.createElement("div"); 
    var text = document.createTextNode("Your browser does not seem to support WEBGL"); 
    tableCell.appendChild(text); 
    tableCell.style.verticalAlign = 'middle';
    tableCell.style.color = 'white';
    tableCell.style.display = 'table-cell';
    table.appendChild(tableCell);
    var gameContainer = document.getElementById("GameContainer"); 

    gameContainer.removeChild(document.getElementById("GameCanvas"));
    gameContainer.appendChild(table);
}

var bundle = document.createElement('script');
bundle.async = true;
bundle.src = 'all.js';
bundle.addEventListener('load',function(){
    document.body.removeChild(bundle);
    var game = new Game();
    game.loop();
},false);
document.body.appendChild(bundle);

}

function _initRes(){
    
    var ua = window.navigator.userAgent.toLowerCase();
    var isMobile = /mobile|android|iphone|ipad/.test(ua);
    var isIPad = /ipad/.test(ua);
    var isIphone = /iphone/.test(ua);
    var isAndroid = /android/.test(ua);
    var isMessenger = /messenger/.test(ua);
    clientWidth = window.innerWidth ;//window.screen.availWidth;
    // if(clientWidth % 2 == 1 && !isMobile)
    // {
    //   clientWidth -= 1;
    // }
    clientHeight = window.innerHeight ;//window.screen.availHeight;
    // if(clientHeight % 2 == 1 && !isMobile)
    // {
    //   clientHeight -= 1;
    // }
    // document.getElementById("GameContainer").style.height = clientHeight + "px";
    // document.getElementById("GameContainer").style.width = clientWidth + "px";

    // keep original ratio once the game inited
    clientRatio = clientWidth / clientHeight;
    clientScale = 1.0;
    clientOffset = {x: 0, y: 0};
    clientOrientation = "landscape";
    if(window.orientation == 0 || window.orientation == 180)
    {
        clientOrientation = "portrait";
    }
    if(!isMobile)
    {
        
        if(clientWidth > clientHeight * 3 / 4)
        {
        // if screen ratio is larger than 3 / 4, keep it 3 / 4
        clientWidth = Math.floor(clientHeight * 3 / 4);
        clientOffset.x = (window.innerWidth - clientWidth) / 2;
        clientRatio = clientWidth / clientHeight;
        }else if(clientHeight > clientWidth * 2)
        {
        // if screen ratio is less than 1 / 2, keep it 1 / 2
        clientHeight = clientWidth * 2;
        clientOffset.y = (window.innerHeight - clientHeight) / 2;
        clientRatio = clientWidth / clientHeight;
        }
    }

    document.getElementById("GameCanvas").style.height = clientHeight + "px";
    document.getElementById("GameCanvas").style.width = clientWidth + "px";
    if(true)
    {
        

        
        if(isMobile)
        {
        if(clientRatio < 2 / 3){
            clientScale = clientWidth / 480;
            clientWidth = 480;
            clientHeight  /= clientScale; 
        }else{
            
            clientScale = clientWidth / 590;
            clientWidth = 590;
            clientHeight  /= clientScale; 
        }
        
        }else{
        if(clientWidth < 540)
        {
            clientScale = clientWidth / 540;
            clientWidth = 540;
            clientHeight  /= clientScale; 
        }
        }
        
    }
    


    
    var callback  = function(){
        var newClientWidth = window.innerWidth;//window.screen.availWidth;
        // if(newClientWidth % 2 == 1 && !isMobile)
        // {
        //   newClientWidth -= 1;
        // }
        var newClientHeight = window.innerHeight;//window.screen.availHeight;
        // if(newClientHeight % 2 == 1 && !isMobile)
        // {
        //   newClientHeight -= 1;
        // }
        // document.getElementById("GameContainer").style.height = newClientHeight + "px";
        // document.getElementById("GameContainer").style.width = newClientWidth + "px";
        
        var containerWidth = newClientWidth;
        var containerHeight = newClientHeight;
        var newRatio = newClientWidth / newClientHeight;
        if(newRatio > clientRatio)
        {
        containerWidth = Math.floor(containerHeight * clientRatio);
        clientOffset.x = (newClientWidth - containerWidth) / 2;
        clientOffset.y = 0;
        clientScale = newClientHeight / clientHeight;
        }else
        {
        containerHeight = Math.floor(containerWidth / clientRatio);
        clientOffset.x = 0;
        clientOffset.y = (newClientHeight - containerHeight) / 2;
        clientScale = newClientWidth / clientWidth;
        }
        document.getElementById("GameCanvas").style.height = containerHeight + "px";
        document.getElementById("GameCanvas").style.width = containerWidth + "px";
    }

    
    // console.log(isIPad, isMessenger);
    // console.log(ua);
    
    if(!(isIPad && isMessenger))
    {
        // messenger on ipad does not return correct inner width and height after resize.
        window.addEventListener('resize', callback, false);
    }
    
    
    var orientationChange = function() {

        var orientation = "landscape";
        if(window.orientation == 0 || window.orientation == 180)
        {
        orientation = "portrait";
        }

        if(orientation === clientOrientation)
        {
        // document.getElementById("GameContainer").style.height = clientHeight + "px";
        // document.getElementById("GameContainer").style.width = clientWidth + "px";

        document.getElementById("GameCanvas").style.height = clientHeight + "px";
        document.getElementById("GameCanvas").style.width = clientWidth + "px";

        clientScale = 1.0;
        clientOffset = {x: 0, y: 0};
        clientRatio = clientWidth / clientHeight;
        }else{
        var newClientWidth = clientHeight;
        var newClientHeight = clientWidth;
        // document.getElementById("GameContainer").style.height = newClientHeight + "px";
        // document.getElementById("GameContainer").style.width = newClientWidth + "px";
        
        var containerWidth = newClientWidth;
        var containerHeight = newClientHeight;
        var newRatio = newClientWidth / newClientHeight;
        if(newRatio > clientRatio)
        {
            containerWidth = Math.floor(containerHeight * clientRatio);
            clientOffset.x = (newClientWidth - containerWidth) / 2;
            clientOffset.y = 0;
            clientScale = newClientHeight / clientHeight;
        }else
        {
            containerHeight = Math.floor(containerWidth / clientRatio);
            clientOffset.x = 0;
            clientOffset.y = (newClientHeight - containerHeight) / 2;
            clientScale = newClientWidth / clientWidth;
        }
        document.getElementById("GameCanvas").style.height = containerHeight + "px";
        document.getElementById("GameCanvas").style.width = containerWidth + "px";
        }
    }

    if(isIPad && isMessenger)
    {
        // specific for messenger on ipad since it does not return correct inner width and height after resize.
        window.addEventListener("orientationchange", orientationChange, false);
    }

}







