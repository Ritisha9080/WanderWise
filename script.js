
/*
  WANDERWISE TRAVEL PLANNER - JAVASCRIPT

  JavaScript makes the website interactive.

  It allows visitors to:
  - Explore travel destinations.
  - Save destinations to a wishlist.
  - Generate personalized travel itineraries.
  - Calculate travel budgets.
  - Complete a travel preparation checklist.

  The website also uses localStorage to remember
  saved destinations and completed checklist tasks.
*/

/*
  SECTION 1: TRAVEL DESTINATION DATA

  An array is a collection of values stored together.

  The places array contains five destination objects.
  An object groups related information using properties.

  Each destination has:
  - name: The destination name.
  - region: A short description.
  - photo: The image identifier.
  - alt: A description of the image.
  - activities: Suggested travel activities.

  Each activity contains its title, description,
  and category tags used by the trip planner.
*/

const places = [
  {name:'Europe',region:'Historic streets & café culture',photo:'photo-1516483638261-f4dbaf036963',alt:'Colorful European coastal village',activities:[
    ['Paris: Île de la Cité','Walk the riverbanks, visit Sainte-Chapelle, and try a neighborhood boulangerie.','culture food'],['Paris: Canal Saint-Martin','Browse independent shops, picnic by the canal, and explore side streets.','local food slow'],['Versailles gardens','Take the train to Versailles and spend time in the expansive formal gardens.','nature culture'],['Paris markets','Visit Marché des Enfants Rouges and make an unhurried lunch of market finds.','food local slow'],['Louvre & Tuileries','Choose a few Louvre galleries, then unwind in the Tuileries garden.','culture slow'],['Normandy coast','Take a day trip to Étretat for cliffside paths and sea views.','nature'],['Paris village lanes','Explore Montmartre early, visit a small studio, and pause at a neighborhood café.','local culture'] ]},
  {name:'Nepal',region:'Mountain air & warm welcomes',photo:'photo-1544735716-392fe2489ffa',alt:'Colorful Nepalese prayer flags in the Himalayas',activities:[
    ['Patan’s old quarter','Explore Patan Durbar Square and its Newari courtyards with time for a local meal.','culture food'],['Swayambhunath at sunrise','Climb the hilltop steps for valley views and visit the monastery respectfully.','culture nature'],['Boudhanath kora','Walk the stupa circuit with locals, then settle into a nearby tea house.','culture local'],['Bhaktapur pottery square','Watch potters at work and try king curd in a shaded square.','local food culture'],['Shivapuri foothill walk','Take a guided half-day nature walk above the Kathmandu Valley.','nature'],['Asan market morning','Browse spice and produce stalls, then sample momos from a busy local spot.','food local'],['Patan museum & courtyards','Visit the museum at a gentle pace and linger over the carved temple details.','culture slow'] ]},
  {name:'Switzerland',region:'Alpine trails & lakeside calm',photo:'photo-1531366936337-7c912a4589a7',alt:'Swiss alpine village beside a mountain lake',activities:[
    ['Lucerne old town','Cross Chapel Bridge, explore the lanes, and choose a lakeside lunch.','culture food'],['Rigi panorama trail','Ride the mountain railway and take a moderate section of the marked ridge trail.','nature'],['Lake Lucerne by boat','Take a scenic boat crossing and leave the afternoon open for lakeside pauses.','nature slow'],['Market morning','Browse Lucerne’s weekly market stalls and assemble a picnic from local produce.','food local'],['Weggis lakeside','Walk the promenade and swim or sit by the water, weather permitting.','nature slow'],['Swiss Transport Museum','Explore the hands-on exhibits, then walk the nearby lake path.','culture'],['Old town café day','Visit a small gallery, browse local shops, and take a long café break.','local slow'] ]},
  {name:'Italy',region:'Long lunches & timeless streets',photo:'photo-1516483638261-f4dbaf036963',alt:'Colorful Italian coastal village overlooking the sea',activities:[
    ['Florence and the Duomo','Explore the cathedral precinct and choose a nearby trattoria for lunch.','culture food'],['Oltrarno artisan lanes','Browse workshops across the Arno and pause in a neighborhood piazza.','local culture'],['Fiesole hill walk','Take a bus to Fiesole for an easy countryside walk and views over Florence.','nature'],['Central market lunch','Try regional produce at Mercato Centrale, then take an easy afternoon.','food slow'],['Uffizi highlights','Reserve time for a few galleries and stroll along the Arno afterward.','culture'],['Boboli Gardens','Explore the gardens at a relaxed pace and bring water for the paths.','nature slow'],['Evening aperitivo','Find a local enoteca and enjoy an early evening aperitivo in the neighborhood.','food local'] ]},
  {name:'Bali',region:'Green escapes & ocean sunsets',photo:'photo-1537996194471-e657df975ab4',alt:'Balinese temple framed by lush tropical greenery',activities:[
    ['Ubud rice terraces','Walk the Campuhan Ridge early, then visit a nearby rice terrace with local guidance.','nature'],['Ubud Palace & market','Explore the palace area and browse the market respectfully.','culture local'],['Balinese cooking class','Shop for ingredients and learn regional dishes in a small group class.','food culture'],['Sidemen village day','Take a guided walk through rice fields and village paths with a local guide.','nature local'],['Tirta Empul visit','Learn about the temple’s history; observe ceremonies respectfully and follow local guidance.','culture'],['Sanur beach morning','Walk the beachfront path and enjoy a simple warung lunch.','nature food slow'],['Craft studios in Ubud','Visit a local craft studio, take your time, and leave the afternoon unscheduled.','local slow'] ]}
];

/*
  SECTION 2: DESTINATION IMAGE URLS

  This arrow function creates an image URL using
  an image identifier.

  An arrow function is a shorter way to write
  a JavaScript function.

  Unsplash provides the destination images.
*/

const photoUrl=id=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

/*
  SECTION 3: LOCAL STORAGE KEYS

  localStorage is a browser feature that saves
  key-value pairs on the visitor's device.

  A key is the name used to identify saved data.

  wanderwise-wishlist stores saved destinations.
  wanderwise-checklist stores completed checklist tasks.

  Data remains available after refreshing the page.
*/

const savedKey='wanderwise-wishlist',checkKey='wanderwise-checklist';

/*
  SECTION 4: SAFELY READING SAVED DATA

  safeRead retrieves information from localStorage.

  localStorage.getItem(key) reads a stored value.

  JSON.parse converts a stored JSON string
  back into a JavaScript value.

  try and catch prevent invalid stored data
  from crashing the website.

  If reading fails, the fallback value is returned.
*/

const safeRead=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};

/*
  SECTION 5: FINDING HTML ELEMENTS

  document.querySelector finds an HTML element
  using a CSS selector.

  The # symbol selects an element by its ID.

  These variables reference the destination grid
  and destination dropdown menu.
*/

const grid=document.querySelector('#destination-grid'),select=document.querySelector('#plan-destination');

/*
  SECTION 6: CREATING DESTINATION CARDS

  forEach repeats an operation for every destination.

  document.createElement creates new HTML elements.

  JavaScript creates each destination card, image,
  heart button, title, and description.

  addEventListener listens for user actions.

  When someone clicks a heart button,
  toggleSaved is called with the destination name.

  The completed cards are inserted into the webpage.
*/

places.forEach((place,index)=>{const card=document.createElement('article');card.className='destination-card';const image=document.createElement('div');image.className='destination-image';image.setAttribute('role','img');image.setAttribute('aria-label',place.alt);image.style.backgroundImage=`url("${photoUrl(place.photo)}")`;const probe=new Image();probe.referrerPolicy='no-referrer';probe.onload=()=>{image.style.backgroundImage=`url("${photoUrl(place.photo)}")`};probe.onerror=()=>{image.style.backgroundImage='linear-gradient(135deg,#c9d9d4,#7498a0)'};probe.src=photoUrl(place.photo);const heart=document.createElement('button');heart.type='button';heart.className='heart-button';heart.addEventListener('click',()=>toggleSaved(place.name));image.append(heart);const info=document.createElement('div');info.className='destination-info';const title=document.createElement('h3');title.textContent=place.name;const desc=document.createElement('p');desc.textContent=place.region;info.append(title,desc);card.append(image,info);grid.append(card);const option=document.createElement('option');option.value=String(index);option.textContent=place.name;select.append(option)});

/*
  SECTION 7: READING THE WISHLIST

  savedPlaces reads the saved destination names.

  Array.isArray checks whether the saved data
  is actually an array.

  filter removes entries that do not match
  destinations available on the website.

  This helps handle unexpected stored values.
*/

function savedPlaces(){const value=safeRead(savedKey,[]);return Array.isArray(value)?value.filter(name=>places.some(p=>p.name===name)):[]}

/*
  SECTION 8: SAVING AND REMOVING DESTINATIONS

  toggleSaved runs when someone clicks a heart.

  If the destination is already saved,
  it is removed from the wishlist.

  Otherwise, it is added.

  localStorage.setItem saves the updated list.

  JSON.stringify converts the JavaScript array
  into a string that localStorage can store.

  renderSaved updates the visible wishlist.
*/

function toggleSaved(name){const saved=savedPlaces(),next=saved.includes(name)?saved.filter(item=>item!==name):[...saved,name];try{localStorage.setItem(savedKey,JSON.stringify(next))}catch{}renderSaved()}

/*
  SECTION 9: DISPLAYING THE WISHLIST

  renderSaved updates the wishlist on the page.

  It:
  - Reads saved destinations.
  - Updates the saved-place count.
  - Changes the heart buttons.
  - Displays saved destination names.
  - Creates Remove buttons.

  textContent updates the text inside an element.

  replaceChildren removes the old displayed items
  before the new ones are added.

  aria-pressed communicates button state
  to assistive technologies.
*/

function renderSaved(){const saved=savedPlaces(),host=document.querySelector('#wishlist-items');host.replaceChildren();document.querySelector('#wishlist-count').textContent=`${saved.length} ${saved.length===1?'place':'places'}`;document.querySelectorAll('.destination-card').forEach((card,i)=>{const button=card.querySelector('.heart-button'),active=saved.includes(places[i].name);button.textContent=active?'♥':'♡';button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',`${active?'Remove':'Save'} ${places[i].name} ${active?'from':'to'} wishlist`)});if(!saved.length){const p=document.createElement('p');p.className='wishlist-empty';p.textContent='Your saved places will appear here.';host.append(p);return}saved.forEach(name=>{const row=document.createElement('div'),text=document.createElement('span'),remove=document.createElement('button');row.className='wishlist-item';text.textContent=name;remove.type='button';remove.className='remove-save';remove.textContent='Remove';remove.setAttribute('aria-label',`Remove ${name} from wishlist`);remove.addEventListener('click',()=>toggleSaved(name));row.append(text,remove);host.append(row)})}

/*
  SECTION 10: TRAVEL STYLE PREFERENCES

  This object connects travel styles with
  activity categories.

  The planner uses these categories to decide
  which activities best match the visitor's choices.
*/

const styles={balanced:['culture','food','nature','local','slow'],culture:['culture','local','food'],nature:['nature','local','food'],slow:['slow','food','nature','local']};

/*
  SECTION 11: GENERATING A TRAVEL ITINERARY

  This event listener runs when the visitor
  submits the trip planner form.

  event.preventDefault stops the browser from
  reloading the page when the form is submitted.

  JavaScript then:
  1. Reads the selected destination.
  2. Reads the trip duration.
  3. Reads selected interests and travel style.
  4. Scores activities based on those preferences.
  5. Sorts activities by their scores.
  6. Chooses activities for the requested days.
  7. Displays the generated itinerary.

  The results are created in the browser.
  This feature does not need a backend server.
*/

document.querySelector('#planner-form').addEventListener('submit',event=>{event.preventDefault();const index=Number(select.value),duration=Number(document.querySelector('#duration').value),place=places[index];if(!Number.isInteger(index)||!place||![3,5,7].includes(duration))return;const interests=[...document.querySelectorAll('[name="interest"]:checked')].map(input=>input.value);const selectedStyle=document.querySelector('#style').value,preferred=styles[selectedStyle]||styles.balanced;let activities=place.activities.map((activity,order)=>({activity,order,score:activity[2].split(' ').reduce((n,tag)=>n+(interests.includes(tag)?4:0)+(preferred.includes(tag)?2:0),0)})).sort((a,b)=>b.score-a.score||a.order-b.order).map(item=>item.activity);const chosen=[];while(chosen.length<duration){const candidate=activities.find(activity=>!chosen.includes(activity));if(!candidate)break;chosen.push(candidate)}const host=document.querySelector('#itinerary');host.replaceChildren();const heading=document.createElement('h3');heading.textContent=`${duration} days in ${place.name}`;heading.style.font='500 25px var(--serif)';host.append(heading);chosen.forEach(([title,description],dayIndex)=>{const day=document.createElement('section'),h=document.createElement('strong'),p=document.createElement('p');day.className='day-card';h.textContent=`Day ${dayIndex+1} · ${title}`;p.textContent=description;day.append(h,p);host.append(day)})});

/*
  SECTION 12: BUDGET INPUT VALIDATION

  Validation checks whether entered data
  follows the expected rules.

  The budget calculator accepts numbers
  between 0 and 1,000,000.

  Invalid values should not be used
  in budget calculations.
*/

// Avoid relying on browser coercion: empty, negative, non-finite, and out-of-range values are invalid.

/*
  This code finds the budget inputs and creates
  an error message for invalid values.

  role="alert" helps assistive technologies
  announce the error message.
*/

const budgetInputs=[...document.querySelectorAll('#budget-form input')],budgetForm=document.querySelector('#budget-form'),error=document.createElement('p');error.className='fine-print';error.id='budget-error';error.setAttribute('role','alert');error.textContent='Enter amounts from $0 to $1,000,000. Decimals are allowed.';error.hidden=true;budgetForm.append(error);

/*
  SECTION 13: WATCHING BUDGET INPUTS

  An input event occurs when a visitor
  changes the value in a field.

  The updateBudget function runs whenever
  a budget amount changes.

  A blur event occurs when the visitor
  moves away from an input field.

  Valid values are converted into
  a consistent numeric format.
*/

budgetInputs.forEach(input=>{input.min='0';input.max='1000000';input.step='0.01';input.addEventListener('input',updateBudget);input.addEventListener('blur',()=>{if(input.value!==''&&input.validity.valid)input.value=String(Number(input.value))})});

/*
  SECTION 14: CALCULATING THE BUDGET

  updateBudget performs the budget calculations.

  It:
  1. Checks for invalid input values.
  2. Reads the expense amounts.
  3. Adds accommodation, transportation,
     food, and activity expenses.
  4. Subtracts spending from the total budget.
  5. Updates the remaining amount.
  6. Updates the progress bar.
  7. Displays a message about the budget.

  Number.isFinite checks whether a value
  is a valid finite number.

  toLocaleString formats numbers for display.

  The budget is calculated locally in JavaScript.
*/

function updateBudget(){const invalid=budgetInputs.find(input=>input.value.trim()===''||!Number.isFinite(input.valueAsNumber)||input.valueAsNumber<0||input.valueAsNumber>1000000);error.hidden=!invalid;budgetInputs.forEach(input=>input.setAttribute('aria-invalid',String(Boolean(invalid&&input===invalid))));if(invalid){document.querySelector('#budget-message').textContent='Please correct the highlighted amount.';return}const [stay,transport,food,activities,total]=budgetInputs.map(input=>input.valueAsNumber),spend=stay+transport+food+activities,remaining=total-spend;document.querySelector('#spent').textContent=`$${spend.toLocaleString(undefined,{maximumFractionDigits:2})}`;document.querySelector('#remaining').textContent=`$${Math.abs(remaining).toLocaleString(undefined,{maximumFractionDigits:2})}`;document.querySelector('#remaining-label').textContent=remaining<0?'Over budget':'Still to spend';document.querySelector('#progress').style.width=`${total?Math.min(100,spend/total*100):0}%`;document.querySelector('#budget-message').textContent=remaining<0?'Your estimates are over budget. Adjust a category to make room.':remaining===0?'Your budget is fully allocated.':'A little room left for the unexpected.'}

/*
  SECTION 15: TRAVEL CHECKLIST DATA

  This array contains eight travel preparation tasks.

  safeRead loads previously completed tasks
  from localStorage.

  The filter operation removes invalid indexes
  so only existing checklist items are included.
*/

const checklist=['Check passport and travel documents','Confirm accommodation details','Arrange airport or station transfers','Pack any prescription medication','Download maps for offline use','Tell your bank about travel plans','Pack a reusable water bottle','Leave a copy of your itinerary with someone'],list=document.querySelector('#checklist-list');let checked=safeRead(checkKey,[]);if(!Array.isArray(checked))checked=[];checked=checked.filter(index=>Number.isInteger(index)&&index>=0&&index<checklist.length);

/*
  SECTION 16: DISPLAYING THE CHECKLIST

  renderChecks creates the checklist items.

  Each item contains a checkbox.

  When someone checks or unchecks an item:
  - JavaScript updates the completed-task array.
  - localStorage.setItem saves the new array.
  - renderChecks updates the checklist display.

  This is why checked items remain checked
  after the visitor refreshes the page.
*/

function renderChecks(){list.replaceChildren();checklist.forEach((label,index)=>{const li=document.createElement('li'),lab=document.createElement('label'),box=document.createElement('input');box.type='checkbox';box.checked=checked.includes(index);box.addEventListener('change',()=>{checked=box.checked?[...new Set([...checked,index])]:checked.filter(value=>value!==index);try{localStorage.setItem(checkKey,JSON.stringify(checked))}catch{}renderChecks()});lab.append(box,document.createTextNode(label));li.append(lab);list.append(li)});document.querySelector('#check-progress').textContent=`${checked.length} of ${checklist.length}`}

/*
  SECTION 17: RESETTING THE CHECKLIST

  This event listener runs when the visitor
  clicks the Reset list button.

  It clears the completed-task array,
  saves an empty array in localStorage,
  and updates the displayed checklist.
*/

document.querySelector('#reset-checklist').addEventListener('click',()=>{checked=[];try{localStorage.setItem(checkKey,'[]')}catch{}renderChecks()});

/*
  SECTION 18: MOBILE NAVIGATION

  The mobile menu is controlled using JavaScript.

  Clicking the menu button adds or removes
  the CSS class named open.

  classList.toggle switches a class on or off.

  When someone clicks a navigation link,
  the mobile menu closes.

  aria-expanded communicates whether
  the menu is currently open.
*/

document.querySelector('.menu-toggle').addEventListener('click',event=>{const nav=document.querySelector('#main-nav'),open=nav.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(open))});document.querySelectorAll('#main-nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#main-nav').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false')}));

/*
  SECTION 19: INITIALIZING THE WEBSITE

  These functions run when script.js loads.

  renderSaved displays saved destinations.
  renderChecks displays the travel checklist.
  updateBudget calculates the starting budget.

  This ensures the website displays
  the correct information when opened.
*/

renderSaved();renderChecks();updateBudget();
