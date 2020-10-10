
this.addEventListener('message', (event) => {
  const workerResult = heavyTask(event.data.taskId);
  // console.log('workerResult', workerResult);
  this.postMessage(workerResult);
});

function delay(ms) {
  const startPoint = new Date().getTime();
  while (new Date().getTime() - startPoint <= ms) {
    // simulating a heavy task
  }
}

function heavyTask(taskId) {
  const result = 100 + taskId;
  const startTime = new Date().getTime();
  delay(2000);
  const totalTime = new Date().getTime() - startTime;
  console.log(`Worker completed task ${taskId} in ${totalTime}ms`);
  return result;
}
