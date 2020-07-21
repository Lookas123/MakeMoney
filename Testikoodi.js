let x = 1;
let moneymakers = 0
let cost = 30
let clickupgrades = 0;
let mupgrades = 0;
let upgradecost = 100;
let money;
let mupgradecost = 200;
let cash = 0;
let availablecash = 0;
let cups = [];
let upgrademult=1;
let mupgrademult = 1;
let totalcash=0;
const costscalepoint = 100000;
let cashformula = 1;
let cup6cost = 1;
let moneymult = 1;
const cupprices = [5,10,10,1]

// click
function double(auto = false){
    if(!auto || cups.includes(5)) {
        x += (2*(cups.includes(2)?1.25:1)) ** clickupgrades * (cash +1) * moneymult;
        document.getElementById("money").innerHTML = "Money: " + format(x);
    }
}


//update visuals
function update(){
    document.getElementById("money").innerHTML = "Money: " + format(x); 
    availablecash = Math.round(Math.log2(x/100000) * 2)-totalcash;
    if (cashformula==2) {
	availablecash += totalcash;    
    }
    if (moneymakers>0 || totalcash>0) {
    document.getElementById("moneymakers").innerHTML = "You have " + moneymakers + " moneymakers, making " + format(moneymakers*((1.5*(cups.includes(1)?1.25:1))**mupgrades)*(cash+1)*moneymult) + " money per second" 
    }
    if (availablecash<0) {
        availablecash=0
    }
    if (totalcash >0) {
    document.getElementById("cash").innerHTML = "You have " + format(cash) + " cash, making you make " + format(cash) + " times more money"
    }
    if (availablecash > 0 || totalcash>0) {
        show("prestige") 
    document.getElementById("prestige").innerHTML = "Sell everything and get " + format(availablecash) + " cash!"
    }else {
        hide("prestige")
    }
    document.getElementById("click").innerHTML = "Click here for " + format((2*(cups.includes(2)?1.25:1)) ** clickupgrades * (cash +1) * moneymult) + " money"
    if (x<20&&moneymakers==0&&totalcash==0) {
        hide("buy")
    }else{
        show("buy")
    }
    if (x<75&&totalcash==0&&clickupgrades==0) {
        hide("upgrade")
    }else{
        show("upgrade")
    }
    if (x<150 && totalcash==0&& mupgrades==0) {
        hide("mupgrade")
    }else{
        show("mupgrade")
    }
    if (totalcash==0) {
        hide("cup1")
        hide("cup2")
        hide("cup3")
        hide("cup4")
        hide("cup5")
        hide("cup6")
        hide("respec")
    }else{
        show("cup1")
        show("cup2")
        show("cup3")
        show("cup4")
        show("cup5")
        show("cup6")
        show("respec")
    }
    if (x>=upgradecost){
        document.getElementById("upgrade").classList.add("buyable")
        document.getElementById("upgrade").classList.remove("unbuyable")
    }else{
        document.getElementById("upgrade").classList.add("unbuyable")
        document.getElementById("upgrade").classList.remove("buyable")
    }
    if (x>=mupgradecost){
        document.getElementById("mupgrade").classList.add("buyable")
        document.getElementById("mupgrade").classList.remove("unbuyable")
    }else{
        document.getElementById("mupgrade").classList.add("unbuyable")
        document.getElementById("mupgrade").classList.remove("buyable")
    }
    if (x>=cost){
        document.getElementById("buy").classList.add("buyable")
        document.getElementById("buy").classList.remove("unbuyable")
    }else{
        document.getElementById("buy").classList.add("unbuyable")
        document.getElementById("buy").classList.remove("buyable")
    }
    if(cash>=1) {   
        document.getElementById("cup4").classList.add("buyable")
        document.getElementById("cup4").classList.remove("unbuyable")
    }else{
        document.getElementById("cup4").classList.add("unbuyable")
        document.getElementById("cup4").classList.remove("buyable")        
    }
    if(cash>=5) {   
        document.getElementById("cup1").classList.add("buyable")
        document.getElementById("cup1").classList.remove("unbuyable")
    }else{
        document.getElementById("cup1").classList.add("unbuyable")
        document.getElementById("cup1").classList.remove("buyable")        
    }
    if(cash>=10) {   
        document.getElementById("cup2").classList.add("buyable")
        document.getElementById("cup2").classList.remove("unbuyable")
        document.getElementById("cup3").classList.add("buyable")
        document.getElementById("cup3").classList.remove("unbuyable")
    }else{
        document.getElementById("cup3").classList.add("unbuyable")
        document.getElementById("cup3").classList.remove("buyable")
        document.getElementById("cup2").classList.remove("buyable")
        document.getElementById("cup2").classList.add("unbuyable")        
    }
    if(cash>=cup6cost) {   
        document.getElementById("cup6").classList.add("buyable")
        document.getElementById("cup6").classList.remove("unbuyable")
    }else{
        document.getElementById("cup6").classList.add("unbuyable")
        document.getElementById("cup6").classList.remove("buyable")       
    }
    if(cash>=30&&cups.includes(1)&&cups.includes(2)&&cups.includes(3)&&cups.includes(4)) {   
        document.getElementById("cup5").classList.add("buyable")
        document.getElementById("cup5").classList.remove("unbuyable")
    }else{
        document.getElementById("cup5").classList.add("unbuyable")
        document.getElementById("cup5").classList.remove("buyable")        
    }
    
}
function gainmoney() {
    x += Math.round(moneymakers*((1.5*(cups.includes(1)?1.25:1))**mupgrades)*(cash+1)*moneymult)
}

function upgrade(){
    if (x >= upgradecost) {
     x-= upgradecost
     upgradecost *=3 
     if (upgradecost > getcostscalepoint()) {
         upgradecost *= Math.round(Math.log10(upgradecost)/3)
     }
     clickupgrades++;
     document.getElementById("upgrade").innerHTML = "Upgrade your clicks for " + format(upgradecost) + " money";
     document.getElementById("money").innerHTML = "Money: " + format(x); 
    }
}

//upgrade moneymakers
function mupgrade(){
    if (x >= mupgradecost) {
     x -= mupgradecost
     mupgradecost *= 2
     if (mupgradecost > getcostscalepoint()) {
         mupgradecost *= Math.round(Math.log10(mupgradecost)/3)
     } 
     mupgrades++;
     document.getElementById("mupgrade").innerHTML = "Upgrade your moneymakers for " + format(mupgradecost) + " money";
     document.getElementById("money").innerHTML = "Money: " + format(x); 
    }
}

//buy moneymakers
function buy(){
    if (x >= cost) {
       x -= cost 
       moneymakers +=1
       cost *= 1.2
       cost = Math.round(cost)
       document.getElementById("buy").innerHTML = "Buy a moneymaker for " + format(cost) + " money"
    }
}

//sell stuff cash
function prestige() {
     x = 1;
     moneymakers = 0
     cost = 30
     mult = 1
     mupgrades = 0;
     clickupgrades = 0;
     upgradecost=100;
     mupgradecost = 200;
     totalcash += availablecash;
     cash += availablecash;
     document.getElementById("moneymakers").innerHTML = "You have " + moneymakers + " moneymakers, making " + moneymakers*mult + " money per second"   
     document.getElementById("mupgrade").innerHTML = "Upgrade your moneymakers for " + mupgradecost + " money";
     document.getElementById("upgrade").innerHTML = "Upgrade your clicks for " + upgradecost + " money";
     document.getElementById("buy").innerHTML = "Buy a moneymaker for " + cost + " money"
     hide("prestige")
}


//convert a number to scientific
function format(a) {
    if (a>=1000) {
        return Math.round(a/Math.pow(10, Math.floor(Math.log10(a)))*100)/100+"e"+Math.floor(Math.log10(a))
    }else{
        return Math.round(a)
    }

}

function getcostscalepoint(){
    return costscalepoint *(cups.includes(3)?1000:1)
}

function buynormal(cup){
    if(cash>=cupprices[cup-1] && !cups.includes(cup)){
        cash-=cupprices[cup-1];
        cups.push(cup);
        document.getElementById("cup"+cup).classList.add("bought")
    }
}


//5
function buy5() {
    if (cash>=30 && !cups.includes(5)&&cups.includes(1)&&cups.includes(2)&&cups.includes(3)&&cups.includes(4)){
        cash -= 30;
        document.getElementById("cup5").classList.add("bought")
        cups.push(5)
        cashformula=2
        
    }
}

//6
function buy6() {
    if (cash>=cup6cost){
        cash -= cup6cost;
	    moneymult *= 5;
	    cup6cost *= 10;   
        document.getElementById("cup6").innerHTML =  "Quintuple the amount of money you earn for " + format(cup6cost) + " cash"     
    }
}

function respec(){
    for(i=0; i<cupprices.length; i++){
        if(cups.includes(i+1)) cash+=cupprices[i];
        document.getElementById("cup"+(i+1)).classList.remove("bought")
    }
    if(cups.includes(5)){
        cash+=30;
        cashformula=1;
        document.getElementById("cup5").classList.remove("bought")
    }
    while(cup6cost>1){
        cash+=cup6cost/10;
        cup6cost/=10;
    }
    moneymult=1;
    cups=[];
    document.getElementById("cup6").innerHTML =  "Quintuple the amount of money you earn for " + format(cup6cost) + " cash"
}

function hide(x) {
    document.getElementById(x).style.visibility ="hidden";
}

function show(x) {
    document.getElementById(x).style.visibility = "visible";
}

setInterval(update, 50)
setInterval(gainmoney, 1000)
setInterval(double, 200, true);