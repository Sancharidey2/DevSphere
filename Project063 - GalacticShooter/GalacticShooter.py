import cv2
import mediapipe as mp
import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions and setup
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Galactic Shooter")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Load player spaceship image
player_img = pygame.Surface((50, 50), pygame.SRCALPHA)
pygame.draw.polygon(player_img, WHITE, [(25, 0), (50, 50), (0, 50)])  # Triangle ship

# Bullet setup
bullet_img = pygame.Surface((5, 10), pygame.SRCALPHA)
pygame.draw.rect(bullet_img, RED, (0, 0, 5, 10))  # Rectangular bullet

# Enemy setup
enemy_img = pygame.Surface((50, 50), pygame.SRCALPHA)
pygame.draw.rect(enemy_img, BLUE, (0, 0, 50, 50))  # Square enemy

# Power-up setup
power_up_img = pygame.Surface((30, 30), pygame.SRCALPHA)
pygame.draw.circle(power_up_img, GREEN, (15, 15), 15)  # Circular power-up

# Game variables
player_x, player_y = WIDTH // 2, HEIGHT - 60
player_speed = 10
bullets = []
enemy_ships = []
power_ups = []
score = 0
lives = 3  # New variable for lives

# Hand gesture setup
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)

# Camera setup
cap = cv2.VideoCapture(0)

# Set up clock
clock = pygame.time.Clock()

# Load images
player_img = pygame.image.load("player_ship.png")
player_img = pygame.transform.scale(player_img, (50, 50))

bullet_img = pygame.image.load("bullet.png")
bullet_img = pygame.transform.scale(bullet_img, (10, 20))

enemy_img = pygame.image.load("enemy_ship.png")
enemy_img = pygame.transform.scale(enemy_img, (50, 50))

power_up_img = pygame.image.load("power_up.png")
power_up_img = pygame.transform.scale(power_up_img, (30, 30))

# Sound Effects (make sure you have the sound files in your directory)
shoot_sound = pygame.mixer.Sound("shoot.wav")
explosion_sound = pygame.mixer.Sound("explosion.wav")
power_up_sound = pygame.mixer.Sound("power_up.wav")
game_over_sound = pygame.mixer.Sound("game_over.wav")

# Background Music
pygame.mixer.music.load("background_music.mp3")
pygame.mixer.music.play(-1, 0.0)  # Loop music indefinitely

def map_hand_to_screen(x, y, input_width, input_height, output_width, output_height):
    """Map hand coordinates to screen dimensions with limited movement range."""
    mapped_x = int(x * output_width / input_width)
    mapped_y = int(y * output_height / input_height)
    return min(max(mapped_x, 0), output_width), min(max(mapped_y, 0), output_height)

def draw_bullets():
    for bullet in bullets:
        screen.blit(bullet_img, (bullet[0], bullet[1]))

def draw_enemies():
    for enemy in enemy_ships:
        screen.blit(enemy_img, (enemy[0], enemy[1]))

def draw_power_ups():
    for power_up in power_ups:
        screen.blit(power_up_img, (power_up[0], power_up[1]))

def shoot_bullet():
    """Create and shoot a bullet from the player's position."""
    global bullets
    bullets.append([player_x + 22, player_y])
    shoot_sound.play()  # Play shoot sound

def update_bullets():
    global bullets, score
    bullets_to_remove = []  # List to keep track of bullets that need to be removed

    for bullet in bullets[:]:  # Create a copy of the list to iterate over
        bullet[1] -= 10  # Move bullet upwards

        # If the bullet goes off-screen, mark it for removal
        if bullet[1] < 0:
            bullets_to_remove.append(bullet)

        # Check for collision with enemies
        for enemy in enemy_ships[:]:
            if (bullet[0] > enemy[0] and bullet[0] < enemy[0] + 50 and
                bullet[1] > enemy[1] and bullet[1] < enemy[1] + 50):
                bullets_to_remove.append(bullet)
                enemy_ships.remove(enemy)
                score += 10  # Increase score when enemy is hit
                explosion_sound.play()  # Play explosion sound
                break

    # Now remove the bullets from the original list
    for bullet in bullets_to_remove:
        if bullet in bullets:
            bullets.remove(bullet)

def update_enemies():
    """Spawn enemies and update their positions."""
    global enemy_ships, lives
    if random.random() < 0.02:
        enemy_x = random.randint(0, WIDTH - 50)
        enemy_y = -50
        enemy_ships.append([enemy_x, enemy_y])

    for enemy in enemy_ships[:]:
        enemy[1] += 5  # Move enemy down
        enemy[0] += random.randint(-2, 2)  # Add horizontal movement to enemies
        if enemy[1] > HEIGHT:
            enemy_ships.remove(enemy)

        # Check if enemy hits the player
        if (player_x < enemy[0] + 50 and player_x + 50 > enemy[0] and
            player_y < enemy[1] + 50 and player_y + 50 > enemy[1]):
            enemy_ships.remove(enemy)
            lives -= 1
            explosion_sound.play()  # Play explosion sound when hit
            if lives <= 0:
                game_over()

def update_power_ups():
    global power_ups, player_x, player_y, player_speed

    if random.random() < 0.005:  # Spawn power-ups randomly
        power_up_x = random.randint(0, WIDTH - 30)
        power_up_y = -30
        power_ups.append([power_up_x, power_up_y])

    for power_up in power_ups[:]:
        power_up[1] += 5  # Move power-ups downward
        if power_up[1] > HEIGHT:
            power_ups.remove(power_up)

        # Check for collision with player
        if (power_up[0] < player_x + 50 and
            power_up[0] + 30 > player_x and
            power_up[1] < player_y + 50 and
            power_up[1] + 30 > player_y):
            power_ups.remove(power_up)
            activate_power_up()

def activate_power_up():
    """Activate the effect of a power-up."""
    global player_speed
    player_speed += 5
    power_up_sound.play()  # Play power-up sound
    pygame.time.set_timer(pygame.USEREVENT + 1, 5000)  # Reset after 5 seconds

def reset_game():
    """Reset the game variables to their initial states."""
    global player_x, player_y, score, bullets, enemy_ships, power_ups, lives, player_speed
    player_x, player_y = WIDTH // 2, HEIGHT - 60
    player_speed = 10
    bullets.clear()
    enemy_ships.clear()
    power_ups.clear()
    score = 0
    lives = 3

def game_over():
    global score, lives
    game_over_sound.play()  # Play game over sound
    font = pygame.font.Font(None, 72)
    text = font.render("GAME OVER", True, RED)
    screen.blit(text, (WIDTH // 2.8, HEIGHT // 3))
    text = font.render(f"Score: {score}", True, WHITE)
    screen.blit(text, (WIDTH // 2.5, HEIGHT // 2))

    # Draw "Play Again" button
    button_rect = pygame.Rect(WIDTH // 2.5, HEIGHT // 1.5, 200, 50)
    pygame.draw.rect(screen, GREEN, button_rect)
    button_text = pygame.font.Font(None, 36).render("Play Again", True, WHITE)
    screen.blit(button_text, (WIDTH // 2.5 + 50, HEIGHT // 1.5 + 10))

    pygame.display.flip()

    # Wait for button click to reset the game
    waiting_for_click = True
    while waiting_for_click:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                mouse_x, mouse_y = pygame.mouse.get_pos()
                if button_rect.collidepoint(mouse_x, mouse_y):
                    reset_game()
                    game_loop()

# Add a variable to track the time of the last shot
last_shot_time = 0
shooting_cooldown = 200  # 300 milliseconds between shots (you can adjust this value)

def shoot_bullet():
    """Create and shoot a bullet from the player's position.""" 
    global bullets, last_shot_time 
    current_time = pygame.time.get_ticks()  # Get the current time in milliseconds

    # Check if enough time has passed since the last shot 
    if current_time - last_shot_time >= shooting_cooldown:
        bullets.append([player_x + 22, player_y])  # Create a new bullet 
        last_shot_time = current_time  # Update the last shot time

def game_loop():
    global player_x, player_y, score, bullets, enemy_ships, power_ups, lives

    running = True
    target_x, target_y = player_x, player_y  # Add target positions for smoother interpolation
    smoothing_factor = 0.2  # Smoothing factor for movement

    # Initialize player_x, player_y to default values before hand tracking starts
    player_x, player_y = WIDTH // 2, HEIGHT - 60  # Default to center and near bottom of screen
    x, y = player_x, player_y  # Ensure `x` and `y` have values before using them

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.USEREVENT + 1:  # Reset power-up effect
                player_speed = 10

        # Capture webcam image for hand tracking
        ret, frame = cap.read()
        if not ret:
            break
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        if results.multi_hand_landmarks:
            landmarks = results.multi_hand_landmarks[0]
            x = int(landmarks.landmark[mp_hands.HandLandmark.WRIST].x * WIDTH)
            y = int(landmarks.landmark[mp_hands.HandLandmark.WRIST].y * HEIGHT)
        
            # Invert horizontal hand movement (for left-right movement)
            player_x = min(max(WIDTH - x - 25, 0), WIDTH - 50)  # Inverted left-right mapping
            player_y = min(max(y - 25, 0), HEIGHT - 50)  # Keep within vertical bounds (0 to HEIGHT - 50)
        
            # Detect two-finger gesture for shooting
            index_finger = landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            middle_finger = landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
            if abs(index_finger.x - middle_finger.x) < 0.03:
                shoot_bullet()

        update_bullets()
        update_enemies()
        update_power_ups()

        # Draw everything
        screen.fill(BLACK)
        screen.blit(player_img, (int(player_x), int(player_y)))  # Ensure integers for coordinates
        draw_bullets()
        draw_enemies()
        draw_power_ups()

        # Display score and lives
        font = pygame.font.Font(None, 36)
        text = font.render(f"Score: {score}", True, WHITE)
        screen.blit(text, (10, 10))

        text = font.render(f"Lives: {lives}", True, WHITE)
        screen.blit(text, (WIDTH - 150, 10))

        pygame.display.flip()
        clock.tick(60)  # 60 frames per second

    pygame.quit()
    cap.release()

game_loop()
