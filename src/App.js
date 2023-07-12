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
  function handleShowAddFriend()
  {
    setShowAddFriend((show)=> !show)

  }
  function handleAddFriend(friend){
    setFriends((friends)=> [...friends,friend]);
    setShowAddFriend(false)
  }
  
  const [showAddFriend,setShowAddFriend] = useState(false);
  return (
    <div className='app'>
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/> }
        <Button onClick={handleShowAddFriend}>{showAddFriend? "Close" :  "Add friend"}</Button>
        
      </div>
       {selectedFriend && <FormSplitBill/>} 
    </div>
  );
}
function FriendsList({friends})
{
  
  return (<ul>
    {friends.map((friend)=> <Friend friend={friend} key={friend.id}/>)}
    </ul>
  );
}
export default App;
function Friend({friend})
{
  return (
    <li>
      <img src={friend.img} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>) }
      {friend.balance > 0 && (<p className="green">{friend.name} owes you  {Math.abs(friend.balance)}$</p>) }
      {friend.balance === 0 && (<p >You and {friend.name} are even</p>) }
      <Button >Select</Button>
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


function FormSplitBill()
{
  return(
    <form className="form-split-bill">
      <h2>Split a bil with X</h2>
      <label>bill value</label>
      <input type='text'></input>

      <label>Your expences</label>
      <input type='text'></input>

      <label>X's expences</label>
      <input type='text' disabled></input>

      <label>Who is paying the bill</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>X</option>
      </select>

      <Button >Split the bill</Button>
    </form>
  );
}