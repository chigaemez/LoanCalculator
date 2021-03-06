document.getElementById('loan-form').addEventListener('submit', function(e){
  e.preventDefault();

  document.getElementById('loading').style.display = 'block'
  document.getElementById('results').style.display = 'none'

  setTimeout(calculateResult, 3000)

});

function calculateResult(){
  
  document.getElementById('loading').style.display = 'none'
  document.getElementById('results').style.display = 'block'

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value)
  const calculatedInterests = parseFloat(interest.value)/100/12
  const calculatedPayments = parseFloat(years.value)*12

  const x = Math.pow(1 + calculatedInterests, calculatedPayments)
  const monthly = (principal *x* calculatedInterests)/(x-1)

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly*calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2)
  }
  else{
    showError('please check your numbers');
  }

  function showError(error){
    document.getElementById('loading').style.display = 'none'
    document.getElementById('results').style.display = 'none'

    const errorDiv = document.createElement('div')
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')

    errorDiv.className = 'alert alert-danger'
    errorDiv.appendChild(document.createTextNode(error))

    card.insertBefore(errorDiv,heading)

    setTimeout(clearError, 3000)

  }
  function clearError(){
    document.querySelector('.alert').remove()
  }
}