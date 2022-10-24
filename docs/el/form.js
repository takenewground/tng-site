
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

class FormEl extends HTMLFormElement 
{
    constructor() { super(); el_init(this); }
}

export function define(name) 
{
    if (_defs.has(name))
        return;
    _defs.add(name);
    customElements.define(name, FormEl, { extends: "form" });
}

// const proto = FormEl.prototype;
// proto._init = _init;
// proto._onsubmit = _onsubmit;

function el_init(el) 
{
    // const shadow = el.attachShadow({ mode: "open" });
    
    // // const div = document.createElement("div");
    // const style = document.createElement("style");    

    // // shadow.appendChild(div);
    // shadow.appendChild(style);

    el.addEventListener("submit", _onsubmit);   
    
    function _onsubmit(event) 
    {
        event.preventDefault();
        _submit(el, event);
        return false;
    }

}


async function _submit(el, event) 
{
    const fdata = new FormData(event.target);

    let idata = {};
    for (let entry of fdata.entries()) 
        idata[entry[0]] = entry[1];
    // let idata = `{`
    // for (let entry of fdata.entries()) 
    //     idata += `"${entry[0]}": "${entry[1].replaceAll('"','//"')}",`
    // idata = idata.replace(/,$/,'}');
    const body = JSON.stringify(idata);
    
        
    // const data = 
    // {
    //     name: 'John',
    //     email: 'john@domain.com',
    //     message: 'Receiving forms is easy and simple now!',
    // };

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

        if (res.ok && data.status == "OK") { // TODO: data.status.ok specific to formeasy
            // status.innerHTML = "Thanks for your submission!";            
            let event = new CustomEvent('formsuccess', {
                detail: {},
                bubbles: true,
                cancelable: true,
                composed: true
            }); 
            el.dispatchEvent(event);
            el.reset();                       
            
            
        } else {
            alert("Oops, something went wrong. Make sure you are connected to the Internet & try again...")
            // res.json().then(data => {
            //   if (Object.hasOwn(data, 'errors')) {
            //     status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            //   } else {
            //     status.innerHTML = "Oops! There was a problem submitting your form"
            //   }
            // })
        }
    } catch (err) {
        console.error(err);
    }
    // const odata = await res.json();
    // .then((res) => res.json())
    // .then((data) => console.log('data', data))
    // .catch((err) => console.log('err', err));
}