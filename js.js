var cont=document.querySelector('.cont'); // container
var divEl=maakEl('div','');
var errors=maakEl('p',"");

cont.appendChild(divEl);
cont.appendChild(errors);



var knop=document.querySelector('#knop');

var JaarEl=haalEl('#jaar');


knop.addEventListener('click',function(ev){
    ev.preventDefault();
    errors.innerHTML="";
    getData();
    divEl.innerHTML='';

    
})


function getData(){
    // var aantalRecords=haalEl('#records');
    var httpx=new XMLHttpRequest();
    var url=`https://ckan.dataplatform.nl/api/action/datastore_search?resource_id=9a604f8c-3660-4a0a-adb4-5d24c28f5123`;

    httpx.open('GET',url,true);
    httpx.responseType='json';
    httpx.send();
    
    httpx.onload=function(){
        let data=httpx.response;
        cont.appendChild(processData(data));
    }

}


function processData(item){

    var jarenArr=["2003","2004","2005","2006","2007","2008","2009","2010"
    ,"2011","2012","2013","2014","2015","2016","2017","2018","2019"];

    var records=item.result.records;
    var recordsLength=records.length;
    var JaarEl=haalEl('#jaar').trim(); // input jaar opghalen
    var stadEl=haalEl('#buurt').trim();
    errors.innerHTML="";

  
    
    for(var i=0; i<recordsLength; i++){
        
        if(JaarEl.trim().length < 1 && stadEl.trim().length < 1 ){
            errors.innerHTML="Input is leeg";
        }else if(stadEl.trim().length < 1){
            errors.innerHTML="Buurtnaam input is leeg, vul een buurtnaam in";
        }else if(JaarEl.trim().length < 1){
            errors.innerHTML="Vul een jaar in";
        }else if(jarenArr.includes(JaarEl) ===false){
            errors.innerHTML="De jaar moet tussen de 2003 en 2019";
        }else if(stadEl.toLowerCase() !==records[i].naam.toLowerCase()){
            errors.innerHTML="Kan deze buurt niet vinden";
        }
        else if(records[i].naam.toLowerCase() === stadEl.toLowerCase() )
        {
            
            console.log(records[i]);
            var buurtnaanEl=maakEl('p','Buurtnaam: ');
            var span=maakEl('span',`${records[i].naam}`);
            span.classList.add('font');
            buurtnaanEl.appendChild(span);
            
            var jaar=maakEl('p','Jaar: ');
            var span2=maakEl('span', `${ JaarEl}`);
            span2.classList.add('font');
            jaar.appendChild(span2);
            
            var aantal=maakEl('p','Aantal vestigingen: ');
            var span3=maakEl('span',`${records[i][JaarEl]}`+'<hr>');
            
            if(jarenArr.includes(JaarEl)===false){
                span3=maakEl('span','Onbekend '+'<hr>');

            }
            span3.classList.add('font');
            aantal.appendChild(span3);
            

            var buurtnummer=maakEl('p','Buurtnummer: ');
            var span4=maakEl('span',`${ records[i].buurtnr }`);
            span4.classList.add('font');
            buurtnummer.appendChild(span4);

            

            divEl.appendChild(buurtnaanEl);
            divEl.appendChild(buurtnummer);
            divEl.appendChild(jaar);
            divEl.appendChild(aantal);

            errors.innerHTML="";
            break;
        }
    }
    return divEl;
}



function maakEl(tag,value){
    var el=document.createElement(tag);
    el.innerHTML=value;
    return el;
}

function haalEl(selector){
    var SelectorEl=document.querySelector(selector);
    var selectorvalue=SelectorEl.value;
    // SelectorEl.value='';
    return selectorvalue;
}