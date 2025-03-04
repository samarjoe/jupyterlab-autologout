import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_autologout extension.
 */

// Get the config file for the timeout plugin
// The time is in seconds
import config from './logout_conf.json'

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_autologout:plugin',
  description: 'Redirects to /hub/logout when inactive',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_autologout is activated!');

    console.log('jupyterlab_autologout: Config data is activated! ', config);
    
    /* We get the number after magic string so we can allow for
       configurations in the module, even if it means being very
       hacky about it.
       tried: reading from file but there are concerns about doing this outside of static
              tried reading from process.env.<ENV> but they are not exposed
              so this is a quick and dirty hack for the extension.          
    */

    var logout_time = Number(config.logout_time)

    // this works since underscores are not allowed in domain names per RFC 1035
    var ignored_url = config.ignored_url.toString()
    var logout_url = config.logout_url.toString()
    var timeoutInMiliseconds = logout_time * 1000; // Convert in miliseconds

    var timeoutId: number;
    var lastTrigeredTime = 0;

    function startTimer() {
      //Debug
      //console.log("[autologout] start timer set at ", Date.now(), " with timeoutInMilliseconds set to ", timeoutInMiliseconds);
      timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
    }

    function resetTimer() {
      // Timer reset every 10 seconds on event trigered
      if (Date.now() - lastTrigeredTime > 10000) {
        //Debug
        //console.log("[autologout] logout timer reset at ", Date.now());
        console.log("[autologout] logout timer reset")
        lastTrigeredTime = Date.now();
        window.clearTimeout(timeoutId);
        startTimer();
      }
    }

    function doInactive() {
      console.log("[autologout] logout trigered due to user inactivity");
      window.location.href = logout_url;
    }

    function setupTimers () {
      document.addEventListener("mousemove", resetTimer);
      document.addEventListener("mousedown", resetTimer);
      document.addEventListener("keypress", resetTimer);
      document.addEventListener("touchmove", resetTimer);

      startTimer();
    }
    console.log("[autologout] the URL of this page is: " + window.location.href);

    var link = window.location.href;
    var is_ignored = link.includes(ignored_url);
    if (!is_ignored || (ignored_url === "")) {
      console.log("[autologout] setup timer");
      setupTimers();
    } else {
      console.log("[autologout] extension ignored for current host")
    }
    
  }
};

export default plugin;
