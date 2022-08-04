import React from 'react';
import Card from './components/Card';

function App() {

  const text=`In the desert, Walt addresses Declan and his henchmen about the methylamine deal he had previously arranged with Mike and Jesse. Declan is not pleased to hear that Walt is keeping the methylamine for himself. Walt offers to continue cooking Blue Sky, explaining that the difference in quality between his and Declan's product means Walt's product attains a higher yield, which means he has more control over price and by extension a higher profit margin. He offers Declan the chance to buy out Mike's share and oversee Walt's distribution network, guaranteeing that they will make more money than if Declan produced meth on his own. To reinforce his point, Walt demands that Declan "say his name"; Declan resignedly acknowledges Walt as "Heisenberg".`
  const title="Say My Name"

  return (
    <div className="App bg-slate-900 h-screen text-gray-300 flex items-center">
      <Card title={title} text={text}/>
    </div>
  );
}

export default App;
