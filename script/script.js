//We declare it as global variables 
const TotalWeeksExpectancy = 5218;
const TotalMonthsExpectancy = 1200;
const TotalYearsExpectancy = 100;

const quotes = [
    { text: "The greatest obstacle to living is expectancy, which hangs upon tomorrow and loses today.", author: "Seneca", work: "On the Shortness of Life" },
    { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca", work: "On the Shortness of Life" },
    { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius", work: "Meditations" },
    { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", work: "Meditations" },
    { text: "Do not act as if you had ten thousand years to live.", author: "Marcus Aurelius", work: "Meditations" },
    { text: "He who fears death will never do anything worthy of a living man.", author: "Seneca", work: "Letters from a Stoic" },
    { text: "The whole future lies in uncertainty: live immediately.", author: "Seneca", work: "On the Shortness of Life" },
    { text: "Lost time is never found again.", author: "Benjamin Franklin", work: "Poor Richard's Almanack" },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", work: "" },
    { text: "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.", author: "Mark Twain", work: "" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", work: "Beautiful Boy" },
    { text: "Tell me, what is it you plan to do with your one wild and precious life?", author: "Mary Oliver", work: "The Summer Day" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", work: "Nicomachean Ethics" },
    { text: "The unexamined life is not worth living.", author: "Socrates", work: "Apology" },
    { text: "Time you enjoy wasting is not wasted time.", author: "Bertrand Russell", work: "" }
];

function GenerateRandomQuote() 
{
    const RandomIndex = Math.floor(Math.random() * quotes.length);
    const SelectedQuote = quotes[RandomIndex];
    const QuoteParagraph = document.getElementById('RandomQuote');

    if (SelectedQuote.work !== "") 
    {
        QuoteParagraph.innerHTML = `"${SelectedQuote.text}"<br><br><strong>— ${SelectedQuote.author}, ${SelectedQuote.work}</strong>`;
    } 
    else 
    {
        QuoteParagraph.innerHTML = `"${SelectedQuote.text}"<br><br><strong>— ${SelectedQuote.author}</strong>`;
    }
}

/*Whe create the Divs depending on what the user selects*/ 
function GenerateDivs(SizeOfDivs)
{
    const FatherDiv = document.getElementById('Result');
    FatherDiv.innerHTML = '';
    let AmountOfDivs = SizeOfDivs;
    for(let i = 0; i < AmountOfDivs; i++)
    {
        const div = CreateElement('div','Time-box');
        FatherDiv.appendChild(div);
    }
}

function ColorDivs(GetTimeAge)
{
    const DivStyles = document.querySelectorAll('.Time-box');
    let LastIteration = 0;
    for(let i = 0 ; i < GetTimeAge; i++)
    {
        DivStyles[i].style.backgroundColor = "#333333";
        LastIteration = i;  
    }
    DivStyles[LastIteration].style.backgroundColor = "#0066FF";
    for(let i = LastIteration+1 ; i < DivStyles.length; i++)
    {
        DivStyles[i].style.backgroundColor = "#EBEBEB";
    }
}

function CreateElement(tag,className)
{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function getTimeSelectedByUser()
{
    const selectorTime = document.getElementById('TIMESELECTION-SELECT');
    return selectorTime.value;
}

function getMontSelectByUser()
{
    const selectorMonth = document.getElementById('month');
    return selectorMonth.value;
}

function ChangeTextInBox()
{
    let Texts = '';
    switch(getTimeSelectedByUser())
    {
        case 'weeks': Texts = 'Weeks';
        GetElementAndChangeTexts(Texts); 
        GenerateDivs(TotalWeeksExpectancy);
        GetBirthdayDate(Texts);
        break;
        case 'months': Texts = 'Months';
        GetElementAndChangeTexts(Texts); 
        GenerateDivs(TotalMonthsExpectancy);
        GetBirthdayDate(Texts);
        break;
        case 'years': Texts = 'Years';
        GetElementAndChangeTexts(Texts); 
        GenerateDivs(TotalYearsExpectancy);
        GetBirthdayDate(Texts);
        break;
    }
}

function GetElementAndChangeTexts(text)
{
    let Array_BoxesName = ["LeftBoxTime","CenterBoxTime","RightBoxTime"];
    let Array_TextContentFirstParagraph = ["Lived","Left","Total"];
    let Array_TextContentSecondParagraph = ["of expected life","years","year lifespan"];
    for(let i = 0 ; i < Array_BoxesName.length; i++)
    {
        const getBox = document.getElementById(Array_BoxesName[i]);
        const Paragraphs = getBox.querySelectorAll('p');
        Paragraphs[0].textContent = text + " " + Array_TextContentFirstParagraph[i];
        Paragraphs[1].textContent = text + " " + Array_TextContentSecondParagraph[i];
    }
}

addEventListener('change', ChangeTextInBox);

function GetBirthdayDate(UserInput)
{
    let MonthDate = getMontSelectByUser();
    let DayDate = document.getElementById('INPUTDAY').value;
    let YearDate = document.getElementById('INPUTMONTH').value;
    calculateDate(YearDate, DayDate, MonthDate, UserInput);
}

function calculateDate(Year, Day, Month, UserInput)
{
    if(!Day|| !Year)
        {
            return;
        }
    const ActualDate = new Date();
    const DateBirthUser = new Date(Year, Month, Day);
    let DiferenceinMiliseconds = ActualDate - DateBirthUser;
    let TotalDaysLived = DiferenceinMiliseconds / (1000 * 60 * 60 * 24);
    let TotalWeeksLived = Math.floor(TotalDaysLived / 7);
    let TotalMonthsLived = Math.floor(TotalDaysLived / 30.44);
    let TotalYearsLived = Math.floor(TotalDaysLived / 365.25);
    let WeeksLeft = TotalWeeksExpectancy - TotalWeeksLived;
    let MonthsLeft = TotalMonthsExpectancy - TotalMonthsLived;
    let YearsLeft = TotalYearsExpectancy - TotalYearsLived;
    UpdateProgressBar(TotalYearsLived);
    ChangeLifePercentual(TotalYearsLived);
    ChangeLifeStatus(TotalYearsLived);
    switch(UserInput)
    {
        case 'Weeks':
            changeBoxTextTimeLived(TotalWeeksLived, WeeksLeft, TotalWeeksExpectancy);
            ColorDivs(TotalWeeksLived);
            break;
        case 'Months':
            changeBoxTextTimeLived(TotalMonthsLived, MonthsLeft, TotalMonthsExpectancy);
            ColorDivs(TotalMonthsLived);
            break;
        case 'Years':
            changeBoxTextTimeLived(TotalYearsLived, YearsLeft, TotalYearsExpectancy);
            ColorDivs(TotalYearsLived);
            break;
    }
}

function changeBoxTextTimeLived(Lived, Remaining, Total)
{
    document.getElementById('xTimeLived').textContent = Lived;
    document.getElementById('xTimeLeft').textContent = Remaining;
    document.getElementById('xTimeTotal').textContent = Total;
}

function UpdateProgressBar(UserYear)
{
    const ProgressBarWidth = document.getElementById('Progress-Bar-Completion');
    ProgressBarWidth.style.width = `${UserYear}%`;
}

function ChangeLifePercentual(UserYearL)
{
    const PercentualLife = document.getElementById('LifePorcentageAdvanced');
    PercentualLife.textContent = `${UserYearL}` + '%';
}

function ChangeLifeStatus(UserInputAyerLived)
{
    const DocumentLifeStatus = document.getElementById('Life-Status');
    const ParagraphsLifeStatus = DocumentLifeStatus.querySelectorAll('p');
    ParagraphsLifeStatus[1].textContent = "Current Age " + UserInputAyerLived; 
}

function main()
{
    GenerateRandomQuote();
    ChangeTextInBox();
}

main();