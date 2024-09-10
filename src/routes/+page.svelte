<script>
    export let form;

    console.log(form ?? {});
</script>

<section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-10">
                <div class="card rounded-3 text-black">
                    <div class="row g-0">
                        <div class="col-lg-6">
                            <div class="card-body p-md-5 mx-md-4">
                                <div class="text-center">
                                    <img
                                        src="https://kvantorium-nowch.ru/assets/img/kv/logo.png"
                                        style="width: 185px;"
                                        alt="logo"
                                        class="mb-2"
                                    />
                                    <h4 class="mt-1 mb-5 pb-1 kvantomat_title">
                                        Квантомат<span class="badge web_text">Web</span>
                                    </h4>
                                </div>

                                <form method="POST" action="?/login">
                                    <p>Вход в аккаунт</p>
                                    <div class="form-floating mb-2">
                                        <input
                                            type="text"
                                            id="login"
                                            class="form-control"
                                            placeholder="Логин"
                                            name="login"
                                            value="{form?.login ?? ""}"
                                        />
                                        <label for="login">Логин</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <input
                                            type="password"
                                            id="password"
                                            class="form-control"
                                            placeholder="Пароль"
                                            name="password"
                                        />
                                        <label for="password">Пароль</label>
                                    </div>

                                    {#if form?.error === true}
                                    <p class="text-danger">{form?.error_text ?? ""}</p>
                                    {/if}

                                    <div class="text-center pt-1 mb-5 pb-1">
                                        <button
                                            data-mdb-button-init
                                            data-mdb-ripple-init
                                            class="btn btn-primary border-none border-0 btn-block fa-lg gradient-custom-2 mb-3"
                                            type="submit">Войти</button
                                        >
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            class="col-lg-6 d-flex align-items-center gradient-custom-2"
                        >
                            <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 class="mb-4">
                                    Где получить данные для входа?
                                </h4>
                                <p class="small mb-0">
                                    Если вы ученик - попросите логин и пароль у
                                    своего наставника<br />
                                    Если вы наставник - обратитьесь к руководству
                                    или к разработчикам приложения<br />
                                    Если вы руководитель - обратитьесь к разработчикам
                                    приложения
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .gradient-custom-2 {
        /* fallback for old browsers */
        background: #fccb90;

        /* Chrome 10-25, Safari 5.1-6 */
        background: -webkit-linear-gradient(
            to right,
            #ee7724,
            #d8363a,
            #dd3675,
            #b44593
        );

        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        background: linear-gradient(
            to right,
            #ee7724,
            #d8363a,
            #dd3675,
            #b44593
        );
    }

    .web_text {
        background-color: orange;
    }

    .kvantomat_title {
        color: darkblue;
    }

    @media (min-width: 768px) {
        .gradient-form {
            height: 100vh !important;
        }
    }
    @media (min-width: 769px) {
        .gradient-custom-2 {
            border-top-right-radius: 0.3rem;
            border-bottom-right-radius: 0.3rem;
        }
    }
</style>
