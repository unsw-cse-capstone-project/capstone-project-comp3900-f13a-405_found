# COMP3900-f13A-405_Found Capstone Project
## Instructions to run the app from the root directory
1. Ensure sure the setup script is executable by running
    ```chmod +x setup.sh```
2. Install all required dependencies by running
```bash setup.sh``` or ```./setup.sh```
3. Spin up the application by running 
```npm run dev```
4. Open a Chrome browser (or Firefox) and visit `http://localhost:3000`


## Notes

### Disk Space
Students have a memory limit of 500MB on their CSE account. 
This can cause installation to fail if there is not enough memory to install all the dependencies. **Ensure that there is enough memory on the disk if running on CSE servers.** 

### Conflicting Ports
Student accounts on the CSE server share ports with other students. This means that port conflicts can occur if another student has their project open on ```http://localhost:3000```. If this occurs, the conflicting process needs to be killed. 