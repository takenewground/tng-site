
/*
<script type="module">
    import {define} from "./el/form.js";
    define("el-form");
</script>
<form is="el-form" action="https://formspree.io/f/xbjbapez" method="POST">
    <label>Name</label>
    <input type="text" name="name" placeholder="First & Last" required/>    
    <label>Email</label>
        <input type="email" name="email" placeholder="curious@visitor.com" required />
    <label>Message</label>
        <input type="text" name="message" placeholder="Let's make shit happen..." required />
    <button>Submit</button>
    <p form-status></p>
</form>			


*/

const _defs = new Set();



class FormEl extends HTMLElement 
{
    constructor() { super(); el_init(this);}
    submit() {el_submit(this);} // override b/c fuck iOS (https://community.hubspot.com/t5/APIs-Integrations/iOS-Form-Submission-Always-Reloads-Page/m-p/241016)
}

export function define(name) 
{
    if (_defs.has(name))
        return;
    _defs.add(name);
    customElements.define(name, FormEl
        // , { extends: "div" }
    );
}

define("el-form");	

// const proto = FormEl.prototype;
// proto._init = _init;
// proto._onsubmit = _onsubmit;

function el_form(el) 
{
    return el.children[0];
}

function el_init(el) 
{
    

    // const shadow = el.attachShadow({ mode: "open" });
    // // const div = document.createElement("div");
    // const style = document.createElement("style");    
    // // shadow.appendChild(div);
    // shadow.appendChild(style);

    // FIXES: iOS bullshit
    // const form = el_form(el);
    // if (form.hasAttribute("action")) 
    //     form.removeAttribute("action")
    // if (form.getAttribute("method") !== "dialog") // TODO?
    //     form.setAttribute("method", "dialog");
    
    // NOTE: this should never actually fire!

    // form.addEventListener("submit", _onsubmit);   
    // function _onsubmit(event) 
    // {
    //     event.preventDefault();
    //     el_submit(el);
    //     return false;
    // }
    

}

function el_data(el) 
    // {
    //     name: 'John',
    //     email: 'john@domain.com',
    //     message: 'Receiving forms is easy and simple now!',
    // };
{
    const fdata = new FormData(el_form(el));

    let data = {};
    for (let entry of fdata.entries()) 
        data[entry[0]] = entry[1];

    return data;
    
    // let idata = `{`
    // for (let entry of fdata.entries()) 
    //     idata += `"${entry[0]}": "${entry[1].replaceAll('"','//"')}",`
    // idata = idata.replace(/,$/,'}');
}

function el_will_submit(el, data)
{
    el.dispatchEvent(new CustomEvent('formwillsubmit', {
        detail: {data},
        bubbles: true,
        cancelable: true,
        composed: true
    }));    
}

function el_did_submit(el, ok, data)
{
    // TODO: data.status.ok specific to formeasy            
    ok = ok && data.status == "OK";

    if (ok) {
            
        // TODO: status.innerHTML = "Thanks for your submission!";            
        const event = new CustomEvent('formsuccess', {
            detail: {ok}, // TODO:
            bubbles: true,
            cancelable: true,
            composed: true
        }); 
        el.dispatchEvent(event);
        el_form(el).reset();  
    }
    else {
        const event = new CustomEvent('formerror', {
            detail: {ok}, // TODO:
            bubbles: true,
            cancelable: true,
            composed: true
        }); 
        el.dispatchEvent(event);        
        alert("Oops, something went wrong. Make sure you are connected to the Internet & try again...")
        // TODO:
        // res.json().then(data => {
        //   if (Object.hasOwn(data, 'errors')) {
        //     status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        //   } else {
        //     status.innerHTML = "Oops! There was a problem submitting your form"
        //   }
        // })
    }
}

async function el_submit(el) 
{    
    const form = el_form(el);
    if (form.checkValidity() === false) {
        form.reportValidity();   
        return; 
    }    
    const idata = el_data(el);
    el_will_submit(el, idata);

    const body = JSON.stringify(idata);
    
    const DEPLOYMENT_ID = "AKfycbybWK0ZjrcnO5TMYZCkX1q9fzUXl3Mp0RyR0sja0AqPJTqAczH30OBD28_7FHBgYbmu";
    const url = `https://script.google.com/macros/s/${DEPLOYMENT_ID}/exec`;
    try {
        const res = await fetch(url, 
            {
                method: 'POST',
                headers: {'Content-Type': 'text/plain;charset=utf-8'},
                body,
            }
        );
        const data = await res.json();
        el_did_submit(el, res.ok, data);                   
    } catch (err) {
        console.error(err);
    }    
}