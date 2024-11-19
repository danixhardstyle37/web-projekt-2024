import service from './service.js'; 

        window.currentStep = 1;
        const totalSteps = 8;
        window.selectedOption = '';
        window.groupSize = '';
        window.tourLength = '';
        window.tourId = '';
        window.selectedDate = ''; 
        window.selectedGuide = ''; 
        window.selectedPet = ''; 
        window.routeTime;
        window.selectedTime;

        function showButtons(step) {
            if (step === 1) {
                setTimeout(() => document.getElementById('parovi').classList.add('visible'), 500);
                setTimeout(() => document.getElementById('grupa').classList.add('visible'), 1000);
                setTimeout(() => document.getElementById('teambuilding').classList.add('visible'), 1500);
            } else if (step === 2) {
                setTimeout(() => document.getElementById('kratka').classList.add('visible'), 500);
                setTimeout(() => document.getElementById('srednja').classList.add('visible'), 1000);
                setTimeout(() => document.getElementById('duga').classList.add('visible'), 1500);
            } else if (step === 3) {
                fetchTours(); 
            } else if (step === 4) {
                
            } else if (step === 5) {
                fetchVodici(); 
            } else if (step === 6) {
                setTimeout(() => document.getElementById('pas').classList.add('visible'), 500);
                setTimeout(() => document.getElementById('svinja').classList.add('visible'), 1000);
            }else if (step === 7) {
                fetchZivotinje();
            }
        }

        // Korak 1, 2, 6 - select button
        function selectOption(option) {
            document.querySelectorAll('.option-btn').forEach(function(button) {
                button.classList.remove('selected');
            });

            document.querySelector(`.option-btn[onclick="selectOption('${option}')"]`).classList.add('selected');

            window.selectedOption = option;

            showNextButton();

            if(window.currentStep === 1){
                const selectedOptionSpan = document.getElementById('selected-option');
                if (selectedOptionSpan) {
                    selectedOptionSpan.textContent = `${option}`;
                }
            }
            else if(window.currentStep === 2){
                const selectedOptionSpan = document.getElementById('selected-option2');
                if (selectedOptionSpan) {
                    selectedOptionSpan.textContent = `${option}`;
                }
            }
            else if(window.currentStep === 6){
                const selectedOptionSpan = document.getElementById('selected-option3');
                if (selectedOptionSpan) {
                    selectedOptionSpan.textContent = `${option}`;
                }
            }
            
        }

        // Spremanje podataka

        function nextStep() {
            if (window.selectedOption || window.currentStep === 4 || window.currentStep === 5 || window.currentStep === 6) { 
                document.getElementById('next-btn').style.display = 'none';

                switch (window.currentStep) {
                    case 1:
                        window.groupSize = window.selectedOption;
                        console.log("1. Untar switcha: " + window.groupSize);
                        break;
                    case 2:
                        window.tourLength = window.selectedOption;
                        console.log("2. Untar switcha: " + window.tourLength);
                        break;
                    case 3:
                        window.tourId = window.selectedOption;
                        console.log("3. Untar switcha: " + window.tourId);
                        break;
                    case 4:
                        window.selectedDate = document.getElementById('reservation-date').value;
                        window.routeTime = window.selectedTime;
                        console.log("4. Untar switcha: " + window.selectedDate + "\nVrijeme: " + window.routeTime);
                        break;
                    case 5:
                        window.selectedGuide = window.selectedOption;
                        console.log("5. Untar switcha: " + window.selectedGuide.imePrezime);
                        break;
                    case 6:
                        window.selectedPet = window.selectedOption;
                        console.log("6. Untar switcha: " + window.selectedPet);
                        break;
                    case 7:
                        window.selectedAnimal = window.selectedOption;
                        console.log("7. Untar switcha: " + window.selectedAnimal);
                        buildReservation();
                        break;
                    default:
                        console.log("Error");
                }

                window.selectedOption = '';

                document.querySelectorAll('.option-btn').forEach(function(button) {
                    button.classList.remove('visible');
                });

                const currentStepElement = document.getElementById(`step${window.currentStep}`);
                currentStepElement.classList.remove('active');

                window.currentStep++;
                const nextStepElement = document.getElementById(`step${window.currentStep}`);
                nextStepElement.classList.add('active');

                document.getElementById('step-info').innerText = `Korak ${window.currentStep} od 8`;

                showButtons(window.currentStep);
            }
        }

        async function saveReservation() {
            await service.addZakazaneTure(window.reservation);
            alert("Reservation saved successfully!"); 
            window.location.href = "index.html";
        }

        async function buildReservation(){
            let cijena = 0;

            switch(window.groupSize){
                case "Za parove":
                    cijena += 20;
                    break;
                case "Grupa 3-5":
                    cijena += 50;
                    break;
                case "Teambuilding":
                    cijena += 100;
                    break;
                default:
                    console.log("Error");
            }

            switch(window.tourLength){
                case "Kratka":
                    cijena += 100;
                    break;
                case "Srednja":
                    cijena += 150;
                    break;
                case "Duga":
                    cijena += 200;
                    break;
                default:
                    console.log("Error");
            }
            
            const user = await service.getKorisnikByUsername(localStorage.getItem('username'));
            
            window.reservation = {
                tura: {id: window.tourId.id},
                korisnik: {id: user.id},
                vodic: {id: window.selectedGuide.id},
                zivotinja: {id: window.selectedAnimal.id},
                datum: window.selectedDate,
                vrijeme_ture: window.routeTime,
                velicina_grupe: window.groupSize,
                cijena_ture: cijena
            }

            showDetailsOfReservation();
        }

        // Korak 8
        function showDetailsOfReservation() {
            const groupSizeElement = document.getElementById('summary-group-size');
            const tourElement = document.getElementById('summary-tour');
            const dateElement = document.getElementById('summary-date');
            const timeElement = document.getElementById('summary-time');
            const guideElement = document.getElementById('summary-guide');
            const animalElement = document.getElementById('summary-animal');
            const priceElement = document.getElementById('summary-price');
            const btnContainer = document.getElementById('s8-btn-container');
        
            groupSizeElement.style.display = 'none';
            tourElement.style.display = 'none';
            dateElement.style.display = 'none';
            timeElement.style.display = 'none';
            guideElement.style.display = 'none';
            animalElement.style.display = 'none';
            priceElement.style.display = 'none';
            btnContainer.style.display = 'none';
        
            setTimeout(() => {
                groupSizeElement.innerText = window.groupSize;
                groupSizeElement.style.display = "block";
                groupSizeElement.style.opacity = 0;
                groupSizeElement.style.transition = "opacity 1s ease";
                setTimeout(() => { groupSizeElement.style.opacity = 1; }, 10);
        
                tourElement.innerText = window.tourId ? window.tourId.ime : '';
                tourElement.style.display = "block";
                tourElement.style.opacity = 0;
                tourElement.style.transition = "opacity 1s ease";
                setTimeout(() => { tourElement.style.opacity = 1; }, 200);
        
                dateElement.innerText = window.selectedDate;
                dateElement.style.display = "block";
                dateElement.style.opacity = 0;
                dateElement.style.transition = "opacity 1s ease";
                setTimeout(() => { dateElement.style.opacity = 1; }, 400);
        
                timeElement.innerText = window.reservation.vrijeme_ture + ':00 h';
                timeElement.style.display = "block";
                timeElement.style.opacity = 0;
                timeElement.style.transition = "opacity 1s ease";
                setTimeout(() => { timeElement.style.opacity = 1; }, 600);
        
                guideElement.innerText = window.selectedGuide ? window.selectedGuide.imePrezime : '';
                guideElement.style.display = "block";
                guideElement.style.opacity = 0;
                guideElement.style.transition = "opacity 1s ease";
                setTimeout(() => { guideElement.style.opacity = 1; }, 800);
        
                animalElement.innerText = window.selectedAnimal
                    ? window.selectedAnimal.vrsta + ' ' + window.selectedAnimal.ime
                    : '';
                animalElement.style.display = "block";
                animalElement.style.opacity = 0;
                animalElement.style.transition = "opacity 1s ease";
                setTimeout(() => { animalElement.style.opacity = 1; }, 1000);
        
                priceElement.innerText = window.reservation.cijena_ture + '€';
                priceElement.style.display = "block";
                priceElement.style.opacity = 0;
                priceElement.style.transition = "opacity 1s ease";
                setTimeout(() => { priceElement.style.opacity = 1; }, 1200);
            }, 200);
        
            setTimeout(() => {
                btnContainer.style.display = 'block';
                btnContainer.style.opacity = 0;
                btnContainer.style.transition = 'opacity 1s ease';
                setTimeout(() => {
                    btnContainer.style.opacity = 1;
                }, 10);
            }, 1500);
        }
        

        // Korak 2
        async function fetchTours() {
            const tours = await service.getTuraAll(); 
            const filteredTours = tours.filter(tour => tour.duljina.duljina === window.tourLength); 

            const turaButtonsDiv = document.getElementById('tura-buttons');
            turaButtonsDiv.innerHTML = ''; 

            filteredTours.forEach(tour => {
                const button = document.createElement('button');
                button.className = 'tura-btn';
                button.innerText = tour.ime; 
                button.onclick = () => selectTour(tour); 
                turaButtonsDiv.appendChild(button); 
            });

            if (filteredTours.length === 0) {
                turaButtonsDiv.innerHTML = '<p>No tours available for the selected length.</p>';
            }
        }

        function selectTour(tour) {
            window.selectedOption = tour;
        
            const descriptionDiv = document.getElementById('tura-description');
            const imageDiv = document.getElementById('tura-image');
            const nameElement = document.getElementById('tura-name');
            const descriptionElement = document.getElementById('tura-description-text');
        
            imageDiv.style.display = "none";
            nameElement.style.display = "none";
            descriptionElement.style.display = "none";
        
            setTimeout(() => {
                imageDiv.style.display = "block";
                imageDiv.style.opacity = 0;
                imageDiv.style.transition = "opacity 1s ease";
                imageDiv.src = "imgs/reservation/tura/tura_imgs/" + tour.id + ".jpg";
                setTimeout(() => {
                    imageDiv.style.opacity = 1;
                }, 10);
            }, 200);
        
            setTimeout(() => {
                nameElement.style.display = "block";
                nameElement.style.opacity = 0;
                nameElement.style.transition = "opacity 1s ease";
        
                descriptionElement.style.display = "block";
                descriptionElement.style.opacity = 0;
                descriptionElement.style.transition = "opacity 1s ease";
        
                nameElement.innerHTML = `<strong>${tour.ime}</strong>`;
                descriptionElement.innerHTML = `<p>${tour.opis}</p>`;
        
                setTimeout(() => {
                    nameElement.style.opacity = 1;
                }, 10);
        
                setTimeout(() => {
                    descriptionElement.style.opacity = 1;
                }, 300);
            }, 700);
        
            showNextButton();
        }
        
        // Korak 5
        async function fetchVodici() {
            const vodici = await service.getVodicAll();
        
            const vodicButtonsDiv = document.getElementById('vodic-buttons');
            vodicButtonsDiv.innerHTML = '';
        
            vodici.forEach(vodic => {
                const button = document.createElement('button');
                button.className = 'vodic-btn';
                button.innerText = vodic.imePrezime;
                button.onclick = () => selectVodic(vodic);
                vodicButtonsDiv.appendChild(button);
            });
        
            if (vodici.length === 0) {
                vodicButtonsDiv.innerHTML = '<p>No guides available.</p>';
            }
        }
        
        function selectVodic(vodic) {
            window.selectedOption = vodic;
        
            const descriptionDiv = document.getElementById('vodic-description');
            const imageDiv = document.getElementById('vodic-image');
            const nameDiv = document.getElementById('vodic-name');
            const brTuraDiv = document.getElementById('vodic-br-tura');
            const brTelDiv = document.getElementById('vodic-tel');
            const descriptionElement = document.getElementById('vodic-description-text');
        
            imageDiv.style.display = "none";
            nameDiv.style.display = "none";
            brTuraDiv.style.display = "none";
            brTelDiv.style.display = "none";
            descriptionElement.style.display = "none";
        
            setTimeout(() => {
                imageDiv.style.display = "block";
                imageDiv.style.opacity = 0;
                imageDiv.style.transition = "opacity 1s ease";
                imageDiv.src = "imgs/reservation/vodici/vodici_imgs/" + vodic.id + ".jpg";
                setTimeout(() => {
                    imageDiv.style.opacity = 1;
                }, 10);
            }, 200);
        
            setTimeout(() => {
                nameDiv.style.display = "block";
                nameDiv.style.opacity = 0;
                nameDiv.style.transition = "opacity 1s ease";
        
                brTuraDiv.style.display = "block";
                brTuraDiv.style.opacity = 0;
                brTuraDiv.style.transition = "opacity 1s ease";
        
                brTelDiv.style.display = "block";
                brTelDiv.style.opacity = 0;
                brTelDiv.style.transition = "opacity 1s ease";
        
                descriptionElement.style.display = "block";
                descriptionElement.style.opacity = 0;
                descriptionElement.style.transition = "opacity 1s ease";
        
                nameDiv.innerHTML = `<strong>${vodic.imePrezime}</strong>`;
                brTuraDiv.innerHTML = `<strong style="font-size: 1rem; color: #475a8a; opacity: 80%; font-weight: normal;">Broj tura - ${vodic.brojTura}</strong>`;
                brTelDiv.innerHTML = `<strong style="font-size: 1rem; color: #475a8a; opacity: 80%; font-weight: normal;">Br. telefona - ${vodic.broj_telefona}</strong>`;
                descriptionElement.innerHTML = `<p>${vodic.opis}</p>`;
        
                setTimeout(() => {
                    nameDiv.style.opacity = 1;
                }, 10);
        
                setTimeout(() => {
                    brTuraDiv.style.opacity = 1;
                }, 200);
        
                setTimeout(() => {
                    brTelDiv.style.opacity = 1;
                }, 400);
        
                setTimeout(() => {
                    descriptionElement.style.opacity = 1;
                }, 600);
            }, 700);
        
            showNextButton();
        }
        

        // Korak 7
        async function fetchZivotinje() {
            const zivotinje = await service.getZivotinjaAll();
            const filteredZivotinje = zivotinje.filter(zivotinja => zivotinja.vrsta === window.selectedPet);
        
            const zivotinjaButtonsDiv = document.getElementById('zivotinja-buttons');
            zivotinjaButtonsDiv.innerHTML = '';
        
            filteredZivotinje.forEach(zivotinja => {
                const button = document.createElement('button');
                button.className = 'zivotinja-btn';
                button.innerText = zivotinja.ime;
                button.onclick = () => selectZivotinja(zivotinja);
                zivotinjaButtonsDiv.appendChild(button);
            });
        
            if (filteredZivotinje.length === 0) {
                zivotinjaButtonsDiv.innerHTML = '<p>No animals available for the selected type.</p>';
            }
        }
        
        function selectZivotinja(zivotinja) {
            window.selectedOption = zivotinja;
        
            const descriptionDiv = document.getElementById('zivotinja-description');
            const imageDiv = document.getElementById('zivotinja-image');
            const nameElement = document.getElementById('zivotinja-name');
            const descriptionElement = document.getElementById('zivotinja-description-text');
        
            imageDiv.style.display = "none";
            nameElement.style.display = "none";
            descriptionElement.style.display = "none";
        
            setTimeout(() => {
                imageDiv.style.display = "block";
                imageDiv.style.opacity = 0;
                imageDiv.style.transition = "opacity 1s ease";
                imageDiv.src = "imgs/reservation/zivotinja/zivotinja_imgs/" + zivotinja.id + ".jpg";
                setTimeout(() => {
                    imageDiv.style.opacity = 1;
                }, 10);
            }, 200);
        
            setTimeout(() => {
                nameElement.style.display = "block";
                nameElement.style.opacity = 0;
                nameElement.style.transition = "opacity 1s ease";
        
                descriptionElement.style.display = "block";
                descriptionElement.style.opacity = 0;
                descriptionElement.style.transition = "opacity 1s ease";
        
                nameElement.innerHTML = `<strong>${zivotinja.ime}</strong>`;
                descriptionElement.innerHTML = `<p>${zivotinja.opis}</p>`;
        
                setTimeout(() => {
                    nameElement.style.opacity = 1;
                }, 10);
        
                setTimeout(() => {
                    descriptionElement.style.opacity = 1;
                }, 300);
            }, 700);
        
            showNextButton();
        }
        
        // Korak 4
        function setMinDate() {
            const today = new Date();
            today.setDate(today.getDate() + 1);
            const formattedDate = today.toISOString().split('T')[0];
            document.getElementById('reservation-date').setAttribute('min', formattedDate);
        }
        
        function selectDate() {
            const dateInput = document.getElementById('reservation-date');
            const selectedDateDiv = document.getElementById('selected-time-date');
        
            const date = new Date(dateInput.value);
        
            selectedDateDiv.innerText = '';
            document.getElementById('next-btn').style.display = "none";
        
            if (!isNaN(date)) {
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                selectedDateDiv.innerText = `Datum: ${date.toLocaleDateString('hr-HR', options)}`;
                document.getElementById('placeholder-span').style.display = "none";
        
                document.getElementById("time-selection").style.display = "block";
        
                generateTimeButtons(dateInput.value);
            } else {
                selectedDateDiv.innerText = '';
            }
        }
        
        async function generateTimeButtons(selectedDate) {
            const timeContainer = document.getElementById("time-buttons-container");
            timeContainer.innerHTML = "";
        
            let startHour = 9;
            let endHour = 15;
            let interval;
        
            if (window.tourLength === "Kratka") {
                interval = 1;
            } else if (window.tourLength === "Srednja") {
                interval = 2;
            } else if (window.tourLength === "Duga") {
                interval = 3;
            } else {
                console.error("Invalid tour length");
                return;
            }
        
            const reservedTimes = await getReservedTimes(selectedDate);
        
            for (let hour = startHour; hour <= endHour; hour += interval) {
                const timeString = `${hour}:00`;
                const button = document.createElement("button");
                button.type = "button";
                button.className = "time-button";
                button.innerText = timeString;
        
                if (reservedTimes.includes(hour)) {
                    button.disabled = true;
                    button.style.backgroundColor = "gray";
                    button.style.color = "white";
                } else {
                    button.onclick = () => selectTime(timeString);
                }
        
                timeContainer.appendChild(button);
            }
        }
        

        async function getReservedTimes(selectedDate) {
            const zakazane_ture = await service.getZakazaneTureAll();
            const reservedTimes = [];
        
            zakazane_ture.forEach(zt => {
                if (zt.tura.id === window.tourId.id && zt.datum === selectedDate) {
                    reservedTimes.push(zt.vrijeme_ture);
                }
            });
        
            return reservedTimes;
        }
        
        function selectTime(time) {
            document.getElementById("selected-time-date").innerText += ", Vrijeme: " + time;
        
            window.selectedTime = time.split(':')[0];
            showNextButton();
        }   
        
        // Korak 8 reset
        function resetForm(){
            location.reload();
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            showButtons(1);
            setMinDate();
        });
        
        function showNextButton(){
            setTimeout(() => {
                document.getElementById('next-btn').style.display = "block";
                document.getElementById('next-btn').style.opacity = 0;
                document.getElementById('next-btn').style.transition = "opacity 1s ease";
                setTimeout(() => {
                    document.getElementById('next-btn').style.opacity = 1;
                }, 10);
            }, 50);
        }

        // Sve metode inicijalizacija
        window.selectOption = selectOption;
        window.nextStep = nextStep;
        window.selectDate = selectDate;
        window.selectTime = selectTime;
        window.saveReservation = saveReservation;
        window.resetForm = resetForm;
        
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = '';
            alert('Osvježavanje stranice će resetirati izabrano. Nastaviti?');
        });
        