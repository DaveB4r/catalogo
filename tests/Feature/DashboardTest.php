<?php

use App\Models\User;

test('usuarios invitados seran redireccionados al login', function () {
    $this->get('/productos')->assertRedirect('/login');
});

test('Usuario autenticados pueden configurar el catalogo', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/productos')->assertOk();
});