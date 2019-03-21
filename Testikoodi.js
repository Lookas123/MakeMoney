var x = 1;
var moneymakers = 0
var cost = 30
var mult = 1
var upgradecost = 100;
var clickstrength = 1;
var money;
var mupgradecost = 200;
var cash = 0;
var availablecash = 0;
var cups = [];
var upgrademult=1;
var mupgrademult = 1;
var totalcash=0;
var costscalepoint = 100000;
var cashformula = 1;
var cup6cost = 1;
var moneymult = 1;

function double(){
    x += clickstrength * (cash +1) * moneymult;
    money = document.getElementById("money");
    money.innerHTML = "Money: " + format(x);
}

function update(){
    document.getElementById("money").innerHTML = "Money: " + format(x); 
    availablecash = Math.round(Math.log2(x/1000)/2)-totalcash
    if (moneymakers>0 || totalcash>0) {
    document.getElementById("moneymakers").innerHTML = "You have " + moneymakers + " moneymakers, making " + format(moneymakers*mult*(cash+1)*moneymult) + " money per second" 
    }
    if (cashformula = 2) {
        availablecash += totalcash;
    }
    if (availablecash<0) {
        availablecash=0
    }
    if (totalcash >0) {
    document.getElementById("cash").innerHTML = "You have " + cash + " cash, making you make " + cash + " times more money"
    }
    if (availablecash > 0 || totalcash>0) {
        show("prestige") 
    document.getElementById("prestige").innerHTML = "Sell everything and get " + availablecash + " cash!"
    }else {
        hide("prestige")
    }
    document.getElementById("click").innerHTML = "Click here for " + format(clickstrength *(cash+1)*moneymult) + " money"
    if (x<20&&moneymakers==0&&totalcash==0) {
        hide("buy")
    }else{
        show("buy")
    }
    if (x<75&&totalcash==0&&clickstrength==1) {
        hide("upgrade")
    }else{
        show("upgrade")
    }
    if (x<150 && totalcash==0&& mult==1 ) {
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
    }else{
        show("cup1")
        show("cup2")
        show("cup3")
        show("cup4")
        show("cup5")
	show("cup6")
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
    x += Math.round(moneymakers*mult*(cash+1)*moneymult)
}

function upgrade(){
    if (x >= upgradecost) {
     x-= upgradecost
     upgradecost *=3 
     if (upgradecost > costscalepoint) {
         upgradecost *= Math.round(Math.log10(upgradecost)/3)
     }
     clickstrength *=2 * upgrademult;
     document.getElementById("upgrade").innerHTML = "Upgrade your clicks for " + format(upgradecost) + " money";
     document.getElementById("money").innerHTML = "Money: " + format(x); 
    }
}


function mupgrade(){
    if (x >= mupgradecost) {
     x -= mupgradecost
     mupgradecost *=2
     if (mupgradecost > costscalepoint) {
         mupgradecost *= Math.round(Math.log10(mupgradecost)/3)
     } 
     mult *= 1.5 * mupgrademult
     document.getElementById("mupgrade").innerHTML = "Upgrade your moneymakers for " + format(mupgradecost) + " money";
     document.getElementById("money").innerHTML = "Money: " + format(x); 
    }
}

function buy(){
    if (x >= cost) {
       x -= cost 
       moneymakers +=1
       cost *= 1.2
       cost = Math.round(cost)
       document.getElementById("buy").innerHTML = "Buy a moneymaker for " + format(cost) + " money"
    }
}

function prestige() {
     x = 1;
     moneymakers = 0
     cost = 30
     mult = 1
     upgradecost = 100;
     clickstrength = 1;
     mupgradecost = 200;
     totalcash += availablecash;
     cash += availablecash;
     document.getElementById("moneymakers").innerHTML = "You have " + moneymakers + " moneymakers, making " + moneymakers*mult + " money per second"   
     document.getElementById("mupgrade").innerHTML = "Upgrade your moneymakers for " + mupgradecost + " money";
     document.getElementById("upgrade").innerHTML = "Upgrade your clicks for " + upgradecost + " money";
     document.getElementById("buy").innerHTML = "Buy a moneymaker for " + cost + " money"

     hide("prestige")
}

function format(a) {
    if (a>1000) {
        return Math.round(a/Math.pow(10, Math.floor(Math.log10(a)))*100)/100+"e"+Math.floor(Math.log10(a))
    }else{
        return Math.round(a)
    }

}

function buy1() {
    if (cash>=5 && !cups.includes(1)){
        cash -= 5;
        document.getElementById("cup1").classList.add("bought")
        cups.push(1)
        mupgrademult=1.25
    }
}

function buy2() {
    if (cash>=10 && !cups.includes(2)){
        cash -= 10;
        document.getElementById("cup2").classList.add("bought")
        cups.push(2)
        upgrademult=1.25
    }
}

function buy3() {
    if (cash>=10 && !cups.includes(3)){
        cash -= 10;
        document.getElementById("cup3").classList.add("bought")
        cups.push(3)
        costscalepoint = 100000000;
    }
}

function buy4() {
    if (cash>=1 && !cups.includes(4)){
        cash -= 1;
        document.getElementById("cup4").classList.add("bought")
        cups.push(4)
        setInterval(double, 200);
    }
}

function buy5() {
    if (cash>=30 && !cups.includes(5)&&cups.includes(1)&&cups.includes(2)&&cups.includes(3)&&cups.includes(4)){
        cash -= 30;
        document.getElementById("cup5").classList.add("bought")
        cups.push(5)
        cashformula=2
        
    }
}

function buy6() {
    if (cash>=cup6cost){
        cash -= cup6cost;
	moneymult *= 2;
	cup6cost *= 10;   
        document.getElementById("cup6").innerHTML =  "Quintuple the amount of money you earn for " + cup6cost + " cash"     
    }
}

function hide(x) {
    document.getElementById(x).style.visibility ="hidden";
}

function show(x) {
    document.getElementById(x).style.visibility = "visible";
}

setInterval(update, 50)
setInterval(gainmoney, 1000)










