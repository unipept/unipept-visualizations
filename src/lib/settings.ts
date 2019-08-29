/**
 * Settings for the visualisations
 */

export default abstract class Settings {
  height: number = 800;           //visualization height
  width: number = 800;            //visualization width

  enableTooltips: boolean = true; //display tooltips on-mouse-over

  abstract className: string;     //the visualization class: for styling
}

