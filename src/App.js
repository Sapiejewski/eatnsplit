import {useState} from 'react';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  {
    id: 499472,
    name: "Filip",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({onClick,children})
{
  return <button className="button" onClick={onClick}>{children}</button>
}




function App() {
  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend,setSelectedFriend]=useState(null);

  const [showAddFriend,setShowAddFriend] = useState(false);


  function handleShowAddFriend()
  {
    setShowAddFriend((show)=> !show)

  }
  function handleAddFriend(friend){
    setFriends((friends)=> [...friends,friend]);
    setShowAddFriend(false)
  }
  
  function handleSelection(friend){
    setSelectedFriend((cur)=>cur?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(value)
  {
    setFriends(friends=>friends.map(f=>f.id ===selectedFriend.id ? {...f,balance:f.balance+value}: f))
    setSelectedFriend(null);
  }
  return (
    <div className='app'>
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/> }

        <Button onClick={handleShowAddFriend}>{showAddFriend? "Close" :  "Add friend"}</Button>
        
      </div>
       {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBil={handleSplitBill}/>} 
    </div>
  );
}
function FriendsList({selectedFriend,onSelection,friends})
{
  
  return (<ul>
  {friends.map((friend)=> <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>)}
    </ul>
  );
}
export default App;
function Friend({selectedFriend,onSelection,friend})
{
  const isSelected = selectedFriend?.id === friend.id;


  return (
    <li className={isSelected?'selected':""}>
      <img src={friend.img} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>) }
      {friend.balance > 0 && (<p className="green">{friend.name} owes you  {Math.abs(friend.balance)}$</p>) }
      {friend.balance === 0 && (<p >You and {friend.name} are even</p>) }
      <Button onClick={()=>(onSelection(friend))}>{isSelected?"Close":"Select"}</Button>
    </li>
  );
}

function FormAddFriend({onAddFriend}){
  const [name,setName]=useState("");
  const [image,setImage]= useState("https://i.pravatar.cc/48");
  function handleSubmit(e){
    e.preventDefault();
    if(!name || !image) return;
    const id = crypto.randomUUID()
    const newFriend = {name, image:`${image}?=${id}`, balance:0, id: id};
    onAddFriend(newFriend)
    setName('');
    setImage('https://i.pravatar.cc/48');
  }
  return(
    <form className="form-add-friend" onSubmit={handleSubmit}> 
      <label>Friend name</label>
      <input type='text' value={name} onChange={e=>setName(e.target.value)}></input>

      <label>Img url</label>
      <input type='text' value={image} onChange={e=>setImage(e.target.value)}></input>

      <Button>Add</Button>
    </form>
  );
}


function FormSplitBill({onSplitBil,selectedFriend})
{
  const [bill,setBill]=useState("");
  const [paidByUser,setPaidByUser]=useState('')
  const [whoIsPaying,setWhoIsPaying]=useState('user')

  const paidByFriend = bill? bill-paidByUser: "";


  function handleSubmit(e){
    e.preventDefault();
    if(!bill|| !paidByUser) return;
    onSplitBil(whoIsPaying ==='user'? paidByFriend : -paidByUser);
  }
  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bil with {selectedFriend.name}</h2>

      <label>bill value</label>
      <input type='number' value={bill} onChange={(e)=>setBill(Number(e.target.value))}></input>

      <label>Your expences</label>
      <input 
      type='number'
       value={paidByUser}
        onChange={(e)=>
        setPaidByUser(
          Number(e.target.value)> bill ? paidByUser:Number(e.target.value))}>

        </input>

      <label>{selectedFriend.name}'s expences</label>
      <input type='text' disabled value={paidByFriend}></input>

      <label>Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>

      <Button >Split the bill</Button>
    </form>
  );
}