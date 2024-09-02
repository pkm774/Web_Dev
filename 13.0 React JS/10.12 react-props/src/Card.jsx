function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.image} alt="profile_picture" />
      <p>{props.phoneno}</p>
      <p>{props.email}</p>
    </div>
  );
}

export default Card;
