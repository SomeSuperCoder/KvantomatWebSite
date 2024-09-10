<script>
  /** @type {import('./$types').PageData} */
  import axios from "axios";

  export let data;

  function save() {
    print()
  }
</script>
<!-- <table class="table table-striped"> -->
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ФИО</th>
        <th scope="col">Баланс</th>
        <th scope="col">Рейтинг</th>
      </tr>
    </thead>
    <tbody>
      {#each data.records as element, index}
        {#if index < 10}
          <tr>
            <th scope="row">{index+1}</th>
            <td>{element.name}</td>
            <td>{element.balance}</td>
            <td>{element.raiting}</td>
          </tr>
        {/if}
      {/each}
    </tbody>
    
  </table>
<div><button on:click={save} class="btn btn-dark">Распечатать</button></div>
<!-- {#if !active}
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ФИО</th>
        <th scope="col">Баланс</th>
        <th scope="col">Рейтинг</th>
      </tr>
    </thead>
    <tbody>
      {#each data as element}
        <tr>
          <th scope="row">place</th>
          <td>name</td>
          <td>balance</td>
          <td>rating</td>
        </tr>
      {/each}
    </tbody>
    
  </table>
{/if} -->
  <!-- 
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
    
</table> -->
