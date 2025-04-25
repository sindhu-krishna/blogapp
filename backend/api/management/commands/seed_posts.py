from django.core.management.base import BaseCommand
from api.models import Post, Category, Profile
from django.contrib.auth import get_user_model
from faker import Faker
import random

User = get_user_model()
fake = Faker()


class Command(BaseCommand):
    help = 'Seed dummy blog posts for testing'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS("Seeding posts..."))

        # Get or create a demo user and profile
        user, created = User.objects.get_or_create(
            email="testuser@example.com", defaults={"username": "testuser", "password": "testuser123"})
        profile, created = Profile.objects.get_or_create(user=user)

        # Get or create categories
        categories = Category.objects.all()
        if not categories.exists():
            categories = [Category.objects.create(
                title=fake.word()) for _ in range(3)]

        # Create dummy posts
        for _ in range(10):
            title = fake.sentence(nb_words=10)
            description = fake.paragraph(nb_sentences=30)
            Post.objects.create(
                title=title,
                description=description,
                profile=profile,
                user=user,
                category=random.choice(categories),
                image="https://source.unsplash.com/random/300x200",
                tags="health, lifestyle, living, news",
                status="Active"
            )

        self.stdout.write(self.style.SUCCESS("✅ Done seeding posts!"))
