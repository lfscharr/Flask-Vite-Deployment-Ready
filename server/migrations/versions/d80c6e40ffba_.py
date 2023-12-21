"""empty message

Revision ID: d80c6e40ffba
Revises: f8d9ebf4bd3a
Create Date: 2023-12-21 13:36:06.315954

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd80c6e40ffba'
down_revision = 'f8d9ebf4bd3a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('logs', schema=None) as batch_op:
        batch_op.drop_constraint('fk_logs_exercise_id_exercises', type_='foreignkey')
        batch_op.drop_column('exercise_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('logs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('exercise_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('fk_logs_exercise_id_exercises', 'exercises', ['exercise_id'], ['id'])

    # ### end Alembic commands ###
