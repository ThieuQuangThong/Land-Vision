using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Land_Vision.Migrations
{
    /// <inheritdoc />
    public partial class change_interior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInterior",
                table: "Properties");

            migrationBuilder.AddColumn<int>(
                name: "Interior",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Interior",
                table: "Properties");

            migrationBuilder.AddColumn<bool>(
                name: "IsInterior",
                table: "Properties",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
