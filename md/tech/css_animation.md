# CSS Animations for Beginners

## CSS Animations requirements:
1. Keyframes define the stages and styles of the animation
2. Assign @keyframes to CSS element and define how it is animated.

## Keyframes
Each keyframe contains:
1. Name of the animation
2. Stages of the animation
	* 0% is the beginning state of the animation
	* 100% is the nding state of the animation
3. CSS Properties within the stages

## Example:
```@keyframes make-visible {
	0% {
		display: none;
		visibility: hidden;
	}
	60% {
		display: block;
		visibility: block;
	}
}```

```div {
	animation-duration: 1s;
	animation-name: make-visible;
}```

or

```div {
	animation: make-visible 1s;
}
