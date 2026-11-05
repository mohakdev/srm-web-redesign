/**
 * Runs inline in <head>, before first paint. It decides whether this visitor
 * gets the animated site, by adding `motion` to <html>.
 *
 * Motion is withheld when any of these hold:
 *   - the visitor prefers reduced motion
 *   - Data Saver is on, or the connection reports 2G or 3G
 *   - the device reports 2 GB of memory or less, or 2 cores or fewer
 *
 * If the motion controller has not started within 2.5s (slow or failed
 * JavaScript), the class is removed again so no content stays hidden.
 * Without JavaScript at all, the class is never added.
 */
export const motionGateScript = `(function(){
var d=document.documentElement;
function allowed(){
  try{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return false;
    var c=navigator.connection;
    if(c&&(c.saveData||/(^|slow-)2g|3g/.test(c.effectiveType||'')))return false;
    if(navigator.deviceMemory&&navigator.deviceMemory<=2)return false;
    if(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)return false;
    return true;
  }catch(e){return false}
}
if(allowed()){
  d.classList.add('motion');
  setTimeout(function(){if(!d.classList.contains('motion-live'))d.classList.remove('motion')},2500);
}
addEventListener('pagereveal',function(e){
  if(e.viewTransition&&!d.classList.contains('motion'))e.viewTransition.skipTransition();
});
addEventListener('pageswap',function(e){
  if(e.viewTransition&&!d.classList.contains('motion'))e.viewTransition.skipTransition();
});
})();`;
