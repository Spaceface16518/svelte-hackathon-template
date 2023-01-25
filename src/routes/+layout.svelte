<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import userCircle from '$lib/assets/user-circle.svg';

	const segmenter = new Intl.Segmenter('default', { granularity: 'grapheme' });
	const firstChar = (str: string) => {
		const segments = segmenter.segment(str)[Symbol.iterator]();
		return segments.next().value.segment;
	};
</script>

<nav class="navbar bg-base-100 mx-auto">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">Hackathon</a>
	</div>
	<div class="navbar-center">
		<!-- TODO: pages related to the actual app go here -->
		<!-- <a class="btn btn-ghost" href="#" /> -->
	</div>
	<div class="navbar-end">
		{#if $page.data.session}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
					<div class="bg-accent-focus text-neutral-focus rounded-full w-24">
						{#if $page.data.session.user?.name}
							<span class="text-2xl uppercase">{firstChar($page.data.session.user.name)}</span>
						{:else}
							<img class="text-primary-content" src={userCircle} alt="Profile" />
						{/if}
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					{#if $page.data.session.user?.name}
						<li class="menu-title menu-normal">
							<span>{$page.data.session.user.name}</span>
						</li>
					{/if}
					<li><a href="/auth/signout">Sign out</a></li>
				</ul>
			</div>
		{:else}
			<a class="btn btn-accent" href="/auth/signin">Sign In</a>
		{/if}
	</div>
</nav>

<slot />

<footer class="footer footer-center mb-2">
	<div>&copy; Copyright 2023. All rights reserved.</div>
</footer>
