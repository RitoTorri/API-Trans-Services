const salaryBonus = (salary, bonus) => {
    return salary + bonus; // bonus = Bolivares
}

const salaryDeductions = (salary, deductions) => {
    return salary - (salary * (deductions / 100));
}

export default {
    salaryBonus, salaryDeductions
}