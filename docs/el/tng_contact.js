const TAG = "tng-contact";				
const SHOW_DELAY = 1600;
const HIDE_DELAY = 1600;
const raf = requestAnimationFrame;
const delay = function(ms, fn) { return setTimeout(fn, ms); };
const undelay = clearTimeout;

class TNG_Contact extends HTMLElement 
{
    constructor() 	{ super(); _init(this);}
    is_shown() 		{ return this.classList.contains("show"); }
    toggle() 		{ _toggle(this, !this.is_shown()); }
    show() 			{ if (!this.is_shown()) _toggle(this, true); }
    hide() 			{ if (this.is_shown()) _toggle(this, false); }
    clone_template(){ return this.firstElementChild.content.firstElementChild.cloneNode(true); }    
}

customElements.define(TAG, TNG_Contact);

let FRAGMENT;

function _init(el)
{
    el._delay = 0;		
    el.onclick = function (e) 
    { 
        if (el === e.target) el.hide();
        if (e.target.classList.contains("button_close")) {
            el.hide()
        }
    }			
    if (el.is_shown()) 
        _toggle(el, true);		
    
    el.addEventListener("formwillsubmit", function(){
        el.classList.add("submitting");
    })
    el.addEventListener("formerror", function(){
        el.classList.remove("submitting");
        // el.hide();
    })
    el.addEventListener("formsuccess", function(){
        el.classList.remove("submitting");
        el.hide();
    })
    // el.querySelector(".button_close").onclick = function () {
    // 	el.hide();
    // }
}



function _toggle(el, show) 
{		
    if (el._delay) 
        return
                                    
    if (show) 
    {	
        raf(function() 
        {					
        FRAGMENT || (FRAGMENT = el.clone_template());			
        el.classList.remove("hidden");
        el.appendChild(FRAGMENT);						
        raf(function() 
        {																		
            el.classList.add("show");							
            // el._delay = delay(SHOW_DELAY, function() 
            // {						
            // 	el.classList.add("shown");										
            // 	el._delay = 0;
            // });
        });
        });
    }
    else 
    {
        raf(function() 
        {
            el.classList.remove("show");							
            // el.classList.remove("shown");
            el._delay = delay(HIDE_DELAY, function() 
            {
                raf(function() { 
                    el.classList.add("hidden");
                    el.removeChild(FRAGMENT); 
                })
                el._delay = 0;
            });
        });
    }
}






// /*

// <script type="module">
//     import {define} from "./el/form.js";
//     define("el-form");
// </script>
// <form is="el-form" action="https://formspree.io/f/xbjbapez" method="POST">
//     <label>Name</label>
//     <input type="text" name="name" placeholder="First & Last" required/>    
//     <label>Email</label>
//         <input type="email" name="email" placeholder="curious@visitor.com" required />
//     <label>Message</label>
//         <input type="text" name="message" placeholder="Let's make shit happen..." required />
//     <button>Submit</button>
//     <p form-status></p>
// </form>			

// */


// class ContactEl extends HTMLElement 
// {
//     constructor() { super(); el_init(this); }
// }

// customElements.define("tng-contact", ContactEl);


// function el_init(el) 
// {
//     // const shadow = el.attachShadow({ mode: "open" });
    
//     // // const div = document.createElement("div");
//     // const style = document.createElement("style");    

//     // // shadow.appendChild(div);
//     // shadow.appendChild(style);

//     el.addEventListener("submit", _onsubmit);   

//     function _onsubmit(event) 
//     {
//         event.preventDefault();
//         _submit(el, event);
//         return false;
//     }

// }
