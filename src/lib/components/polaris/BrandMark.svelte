<script lang="ts">
	let { small = false }: { small?: boolean } = $props();
</script>

<span class:small class="brand-mark" aria-hidden="true">
	<svg viewBox="0 0 48 48" role="img">
		<circle class="track" cx="24" cy="24" r="18" />
		<path class="blue" d="M24 6a18 18 0 0 1 18 18" />
		<path class="green" d="M42 24a18 18 0 0 1-18 18" />
		<path class="red" d="M24 42A18 18 0 0 1 6 24" />
		<path class="navy" d="M6 24A18 18 0 0 1 24 6" />
		<circle class="core" cx="24" cy="24" r="8" />
	</svg>
</span>

<style>
	.brand-mark {
		display: inline-grid;
		width: 48px;
		height: 48px;
		flex: 0 0 auto;
		place-items: center;
	}

	.brand-mark.small {
		width: 42px;
		height: 42px;
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.track {
		fill: #ffffff;
		stroke: #e6e8ea;
		stroke-width: 2;
	}

	path {
		fill: none;
		stroke-linecap: round;
		stroke-width: 8;
	}

	.blue {
		stroke: #256ef4;
	}

	.green {
		stroke: #228738;
	}

	.red {
		stroke: #d63d4a;
	}

	.navy {
		stroke: #052561;
	}

	.core {
		fill: #ffffff;
	}
</style>
