
let testsRunning = false;

export function isTest() {
    return testsRunning;
}

export function setTestsRunning() {
    testsRunning = true;
}