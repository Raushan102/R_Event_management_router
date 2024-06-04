import classes from './EventItem.module.css';
import {Link,useSubmit} from 'react-router-dom';
function EventItem({ event }) {

  let submit=useSubmit()
  function startDeleteHandler() {
  const conformed=window.confirm('are you sure you want o delete this event');

  if(conformed){
    submit(null,{method:'delete'})
  }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
