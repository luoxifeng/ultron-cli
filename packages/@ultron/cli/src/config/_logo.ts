function getCliName() {
  /*
   __    __   __       ___________  ______        ______   .__   __.
  |  |  |  | |  |     |           ||   _  \     /   __   \ |  \ |  |
  |  |  |  | |  |      ---|  |---- |  |_)  |    |  |  |  | |   \|  |
  |  |  |  | |  |         |  |     |      /     |  |  |  | |  . .  |
  |  '--'  | |  '----.    |  |     |  |\  \---. |   --   | |  |\   |
   \______/  |_______|    |__|     | _| \_____|  \______/  |__| \__|
  */
}

const cliName = getCliName.toString();

export default cliName.substring(cliName.indexOf('/*') + 3, cliName.lastIndexOf('*/'));
